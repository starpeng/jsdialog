//拖动框架
    var Dragdrop = new Class();
    Dragdrop.prototype = {
    
    initialize: function(width, height, shadowWidth, showShadow, contentType) {
        this.dragData = null;
        this.dragDataIn = null;
        this.backData = null;
        this.width = width;
        this.height = height;
        this.shadowWidth = shadowWidth;
        this.showShadow = showShadow;
        this.contentType = contentType;
        this.IsDraging = false;
        this.oObj = G('dialogBox');
        Event.observe(G('dialogBoxTitle'), "mousedown", this.moveStart.bindAsEventListener(this), false)
    }
	, moveStart: function(event) {
	    this.IsDraging = true;
	    if (this.contentType == 1) {
	        G("iframeBG").style.display = "";
	        G("iframeBG").style.width = this.width + "px";
	        G("iframeBG").style.height = this.height + "px";
	    };
	    Event.observe(doc, "mousemove", this.mousemove.bindAsEventListener(this), false);
	    Event.observe(doc, "mouseup", this.mouseup.bindAsEventListener(this), false);
	    Event.observe(doc, "selectstart", this.returnFalse, false);
	    this.dragData =
		{
		    x: Event.pointerX(event), y: Event.pointerY(event)
		};
	    this.backData =
		{
		    x: parseInt(this.oObj.style.left), y: parseInt(this.oObj.style.top)
		}
	}
	, mousemove: function(event) {
	    if (!this.IsDraging) return;
	    var iLeft = Event.pointerX(event) - this.dragData["x"] + parseInt(this.oObj.style.left);
	    var iTop = Event.pointerY(event) - this.dragData["y"] + parseInt(this.oObj.style.top);
	    if (this.dragData["y"] < parseInt(this.oObj.style.top)) iTop = iTop - 12;
	    else if (this.dragData["y"] > parseInt(this.oObj.style.top) + 25) iTop = iTop + 12;
	    this.oObj.style.left = iLeft + "px";
	    this.oObj.style.top = iTop + "px";
	    if (this.showShadow) {
	        G('dialogBoxShadow').style.left = iLeft + this.shadowWidth + "px";
	        G('dialogBoxShadow').style.top = iTop + this.shadowWidth + "px";
	    };
	    this.dragData =
		{
		    x: Event.pointerX(event), y: Event.pointerY(event)
		};
	    doc.body.style.cursor = "move"
	}
	, mouseup: function(event) {
	    if (!this.IsDraging) return;
	    if (this.contentType == 1) G("iframeBG").style.display = "none";
	    doc.onmousemove = null;
	    doc.onmouseup = null;
	    var mousX = Event.pointerX(event) - (doc.documentElement.scrollLeft || doc.body.scrollLeft);
	    var mousY = Event.pointerY(event) - (doc.documentElement.scrollTop || doc.body.scrollTop);
	    if (mousX < 1 || mousY < 1 || mousX > Math.max(doc.documentElement.clientWidth, doc.body.clientWidth) || mousY > Math.max(doc.documentElement.clientHeight, doc.body.clientHeight)) {
	        this.oObj.style.left = this.backData["x"] + "px";
	        this.oObj.style.top = this.backData["y"] + "px";
	        if (this.showShadow) {
	            G('dialogBoxShadow').style.left = this.backData.x + this.shadowWidth + "px";
	            G('dialogBoxShadow').style.top = this.backData.y + this.shadowWidth + "px";
	        }
	    };
	    this.IsDraging = false;
	    doc.body.style.cursor = "";
	    Event.stopObserving(doc, "selectstart", this.returnFalse, false)
	}
	, returnFalse: function() {
	    return false
	}
};



    