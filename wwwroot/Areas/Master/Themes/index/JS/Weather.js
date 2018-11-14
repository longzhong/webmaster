/**
 * ! jQuery wheater 3.0
 *
 * Page URL		: http://julying.com/lab/weather/
 * Mail 		: 316970111@qq.com
 * QQ 			: 316970111 
 * created 		: 2010-09-10 13:55:29 
 * last update 	: 2013-03-1 10:30:00
 * Add 			: China Shenzhen
 *
 * Copyright 2013 | julying.com 
 */
 
 
// 这里是一个简单例子，具体如果有复杂效果，可以直接修改源码。。。。





;var jQueryWeatherConfig = {
    lang : {
        day : '白天',
        night : '夜晚',
        temp : '°C',
        wind : '级风',
        wangzimo : '王子墨'
    },
    convert : function(sky){
        var weatherInfo = {
            'cloud': ['多云', '多云转阴', '晴转多云', '阴转多云'],
            'cloud sun': ['阴'],
            'fog':['雾'],
            'wind': ['沙尘暴', '浮尘', '扬沙', '强沙尘暴'],
            'downpour': ['大雨', '暴雨', '大暴雨', '特大暴雨', '中雨转大雨', '大雨转暴雨', '暴雨转大暴雨', '大暴雨转特大暴雨', '雷阵雨'],
            'showers': ['冻雨', '小雨转中雨', '阵雨'],
            'hail ': ['雷阵雨伴有冰雹'],
            'drizzle ': ['多云转小雨', '小雨转多云', '小雨', '中雨'],
            'sleet'		: ['雨夹雪'],
            'snow'		: ['阵雪','小雪','中雪','大雪','暴雪','小雪转中雪','中雪转大雪','大雪转暴雪','中雪转小雪','大雪转中雪','暴雪转大雪'],
            'sun'	: ['晴']
        },
			weather = '',
			state = '';
        for( state in weatherInfo ){
            if( $.inArray( sky , weatherInfo[state] ) > -1 ){
                weather = state;
                break;
            }
        } 
        return weather || state || 'sunshine'  ;
    }
};




 
$(function(){
	
	
    $.getScript('http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&day=0&city=&charset=utf-8', function(){
        //window.SWther 这是返回的天气情况
        var city, dataInfo = window.SWther.w ;
        for( var city in dataInfo ); //获取 天气
        dataInfo = dataInfo[city][0];
        //jQueryWeatherConfig 
        var weatherData = {
            city : city ,
            date : SWther.add.now.split(' ')[0] || '',
            day_weather: dataInfo.s1,
            night_weather :dataInfo.s2,
            day_temp: dataInfo.t1,
            night_temp: dataInfo.t2,
            day_wind:dataInfo.p1,
            night_wind: dataInfo.p2
        };
		
        var hour = (new Date( SWther.add.now )).getHours();
        var sky = hour > 18 ? weatherData.day_weather : weatherData.night_weather ;
        var weatherBox = $('#weather').weather({ sky: jQueryWeatherConfig.convert(sky), weatherData: weatherData, config: jQueryWeatherConfig });
		  
        //weatherBox 是 整个天气图标的跟节点的 jQuery ，所以可以直接操作，可以自己随意扩展效果。
        setTimeout(function(){
            //weatherBox.hide( );
        }, 1000 );
		
        setTimeout(function(){
            
        }, 2000);
        weatherBox.show();
    });
	
});