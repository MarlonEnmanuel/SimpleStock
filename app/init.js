
$.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

Date.prototype.toSimpleString = function(){
    var s = '';
    s += this.getDate() + '-';
    s += (this.getMonth()+1) + '-';
    s += this.getFullYear() + ' ';
    s += (this.getHours().toString().length==1?'0'+this.getHours().toString():this.getHours().toString()) + ':';
    s += (this.getMinutes().toString().length==1?'0'+this.getMinutes().toString():this.getMinutes().toString());
    return s;
};

var SimpleStock = {
    Models : {},
    Collections : {},
    Views : {},
    Routers : {}
};

var app = {
    models : {},
    collections : {},
    views : {},
};