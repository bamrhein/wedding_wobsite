$(document).ready(function () {
	$("*").each(function () {
	    var $this = $(this);
	    if (parseInt($this.css("fontSize")) < 8) {
	        $this.css({ "font-size": "8px" });
	    }
	});
});