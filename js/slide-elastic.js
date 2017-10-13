(function(){
    var slidesEl, minWidth, minHeight;

    var resize = function() {
        if (window.innerWidth < minWidth || window.innerHeight < minHeight) {
            var sx = window.innerWidth / minWidth;
            var sy = window.innerHeight / minHeight;
            var transform = 'scale(' + Math.min(sx, sy) + ')';
        } else {
            var transform = 'none';
        }

        slidesEl.style.MozTransform = transform;
        slidesEl.style.WebkitTransform = transform;
        slidesEl.style.OTransform = transform;
        slidesEl.style.msTransform = transform;
        slidesEl.style.transform = transform;
    }

    var onLoad = function (list) {
        if (document.readyState === 'complete') {
            list();
        } else {
            window.addEventListener('load', list);
        }
    }

    onLoad(function() {
        slidesEl = document.getElementsByTagName('slides')[0];
        minWidth = slidesEl.offsetWidth;
        minHeight = slidesEl.offsetHeight;

        resize();
        window.addEventListener('resize', resize);
    })
})();