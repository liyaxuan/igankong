import '../less/common.less';
import '../less/exposure_index.less';

import { host, login, getToken } from './ajax.js';
import { getDate, getTime } from './util.js';
import History from '../vue/exposure/history.vue';

login().then(function () {
    new Vue({
        el: '.container',
        data: {
            total: 0,
            wound: 0,
            blood: 0,

            review: [],
            remind: [],
        },
        components: {
            'exposure-history': History
        },
        methods: {

        },
        mounted: function () {
            var self = this;

            $.ajax({
                url: `${host}/weixin/no_evaluate_expose_list`,
                headers: {
                    Token: getToken()
                }
            }).then(function (res) {
                self.review = res.data.map(function (item) {
                    return {
                        content: item.name + '上报了职业暴露, 请立即确认',
                        href: `exposure_report_get.html?exposureId=${item.id}`
                    };
                });
            });

            function getButtonText(type) {
                if(type == 1)
                    return '复查';
                else if(type == 2)
                    return '补报暴露源';
                else if(type == 3)
                    return '补报症状';                
            }

            function getHref(type, alarmId, exposureId) {
                if(type == 1)
                    var href = 'exposure_check.html';
                else if(type == 2)
                    var href = 'source_check.html';
                else if(type == 3)
                    var href = 'report.html';
                return `${href}?alarmId=${alarmId}&exposureId=${exposureId}`;
            }

            $.ajax({
                url: `${host}/weixin/expose_year_count`,
                type: 'GET',
                headers: {
                    Token: getToken()
                }
            }).then(function (res) {
                self.total = res.data.total;
                self.wound = res.data.instrCount;
                self.blood = res.data.liquidCount;
            });

            $.ajax({
                url: `${host}/weixin/expose_alarm_list`,
                headers: {
                    Token: getToken()
                }
            }).then(function (res) {
                self.remind = res.data.map(function (item) {
                    return {
                        content: item.info,
                        buttonText: getButtonText(item.type),
                        href: getHref(item.type, item.id, item.resourceId),
                    };
                });
            });
        }
    })                
});