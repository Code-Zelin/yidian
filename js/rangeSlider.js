/**
 * Created by Administrator on 2017/8/22.
 */
$.fn.RangeSlider = function(cfg){
    this.sliderCfg = {
        min: cfg && !isNaN(parseFloat(cfg.min)) ? Number(cfg.min) : null,
        max: cfg && !isNaN(parseFloat(cfg.max)) ? Number(cfg.max) : null,
        step: cfg && Number(cfg.step) ? cfg.step : 1,
        callback: cfg && cfg.callback ? cfg.callback : null
    };

    var $input = $(this);
    var min = this.sliderCfg.min;
    var max = this.sliderCfg.max;
    var step = this.sliderCfg.step;
    var callback = this.sliderCfg.callback;

    $input.attr('min', min)
        .attr('max', max)
        .attr('step', step);

    $input.bind("input", function(e){
        $input.attr('value', this.value);
        var num = (this.value / 5) *100;
        $input.css( 'background', 'linear-gradient(to right, rgba(255,255,0,5), rgba(255,0,255,.5) '+ (num-0.01) +'% , #fff ' + num + '%, white)' );

        $('.dream-time li').eq(this.value).addClass('cur').siblings().removeClass('cur');
        if ($.isFunction(callback)) {
            callback(this);
        }
    });
};