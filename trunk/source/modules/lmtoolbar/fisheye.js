/*--------------------------------------------------------------------------
 * Basic fisheye contributed by Ronald van Raaphorst
 * 
 * Modified for Ext by Matjaž Lipuš
 * 
 * Fisheye 1.1
 * version d.d. 8/8/2007
 *--------------------------------------------------------------------------*/

Ext.namespace("Ext.ux");
/**
 * @class Ext.ux.Fisheye
 * Fisheye
 * @cfg {Number} startSize Initial icon size
 * @cfg {Number} endSize Max icon size
 * @cfg {Number} hSpace Initial horizontal space between items
 * @cfg {Number} vDiff Vertical space factor to move images vertically
 * @constructor
 * @param {String/HTMLElement/Ext.Element} el The container element or DOM node, or its id
 * @param {Object} config Configuration options
 */
Ext.ux.Fisheye = function(el, eltoolwindow,config)
{
	this.elMe = el;
	this.barwin = eltoolwindow;
	this.barwinbuttonacts = eltoolwindow.buttonactions;
	el = Ext.fly(el);

	config = Ext.applyIf(config || {}, {
		startSize: 40,
		endSize:   100,
		hSpace:    15,
		vDiff:     -25
	});
	Ext.apply(this, config);

	el.wrap({cls: el.dom.id + "-wrap fisheye"});

	var coord       = el.getXY();
	this.dSize      = this.endSize - this.startSize;
	this.top        = coord[1];
	this.left       = coord[0];
	this.hCenter    = el.getWidth() / 2;          // horizontal center of the fisheye
	this.vCenter    = this.top + this.dSize / 2;  // height at which the images are maximized
	this.vTop       = this.vCenter - 100;   // top vertical influence sphere
	this.vBottom    = this.vCenter + 100;  // bottom vertical influence sphere

	this.labelTresholdFactor = 0.6; // Size factor [0-1] above which to display the label
	this.items = Ext.query("img", el.dom);

	Ext.select("span", false, el.dom).setDisplayed(false);
	this.initElements();

	
	Ext.get(document).on("mousemove", this.onMouseMove, this);
	
	
};

Ext.ux.Fisheye.prototype = {
	destroy:function()
	{
		delete this.items;
		this.items = null;
	},
	refreshitems:function()
	{
		if( this.items && this.items.length > 0)
		{
			delete this.items;
			this.items = null;
		}
		el = Ext.fly(this.elMe);
		this.items = Ext.query("img", el.dom);
		Ext.select("span", false, el.dom).setDisplayed(false);
		this.initElements();

	},
	refreshloc:function(x,y)
	{
		
		el = Ext.fly(this.elMe);
		var coord       = el.getXY();	
		this.dSize      = this.endSize - this.startSize;
		this.top        = y;//coord[1];//y;
		this.left       = x;//coord[0];//x;
		//this.hCenter    = el.getWidth() / 2;          // horizontal center of the fisheye
		this.vCenter    = this.top + this.dSize / 2;  // height at which the images are maximized
		this.vTop       = this.vCenter - 100;   // top vertical influence sphere
		this.vBottom    = this.vCenter + 100;  // bottom vertical influence sphere
		this.refreshitems();
		this.initElements();
	},
	initElements: function()
	{
		var itemWidth = this.startSize * this.items.length;
		var itemSpace = this.hSpace * (this.items.length-1);
		var half = (itemWidth + itemSpace) / 2;
		var p    = this.hCenter - half; 
		for (var i=0, len=this.items.length; i<len; i++) {
			this.setSize(this.items[i], this.startSize, this.startSize);
			this.setPos(this.items[i], p, 0);
			this.items[i].centerXPos = p + this.startSize / 2;
			this.items[i].centerYPos = 0 + this.startSize / 2;
			p = p + this.startSize + this.hSpace;
		}
	},

	setSize: function(element, height, width)
	{
		element.style.width  = width + "px";
		element.style.height = height + "px";
	},

	setPos: function(element, x, y)
	{
		element.style.left = x + "px";
		element.style.top  = y + "px";
	},

	onMouseMove: function(event)
	{
		if( !this.items || this.items.length < 1)
			return;
		event = event.browserEvent;
		if (event.clientY < this.vTop || event.clientY > this.vBottom
			|| event.clientX < this.barwin.getPosition()[0] || event.clientX > this.barwin.getPosition()[0] + this.barwin.width) {
			return;
		}
		
		var vFactor;
		if (event.clientY < this.vCenter) {
			vFactor = (event.clientY - this.vTop) / (this.vCenter - this.vTop); 
		} else {
			vFactor = (this.vBottom - event.clientY) / (this.vBottom - this.vCenter); 
		}

		var distance = 0;
		var item;
		var totalWidth = -1 * this.hSpace;

		var hFactor, sizeFactor;

		for (var i=0, len=this.items.length; i<len; i++) {
			item = this.items[i];
			distance = Math.abs(item.centerXPos + this.left - event.clientX);
			if (distance > 100) {
				hFactor = 0;
			} else {
				hFactor = (100 - distance) / 100;
			}

			sizeFactor = vFactor * hFactor;	
			item.sizeFactor = sizeFactor;
			item.newSize = this.startSize + sizeFactor * this.dSize;
			item.newTop  = this.vDiff * vFactor * item.sizeFactor;
			totalWidth   = totalWidth + item.newSize + this.hSpace;
		}
		this.paint(totalWidth);
	},

	paint: function(totalWidth)
	{
		var xPos = this.hCenter - (totalWidth / 2) ; 
		for (var i=0, len=this.items.length; i<len; i++) {
			var item = this.items[i];

			this.setPos(item, xPos, item.style.top);//item.newTop );
			this.setSize(item, item.newSize, item.newSize);

			var x = Ext.query("span", item.parentNode);
			if (item.sizeFactor > this.labelTresholdFactor) {
				this.setPos(x[0], xPos,  item.newSize);
				x[0].style.display = "block";
			} else {
				x[0].style.display = "none";
			}
			xPos = xPos + item.newSize + this.hSpace;
		}
	}
};
