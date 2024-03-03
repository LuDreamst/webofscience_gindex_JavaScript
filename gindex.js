// ==UserScript==
// @name         webofscience_gindex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Display a floating window to show g-index
// @author       LuDreamst with copilot
// @match        https://webofscience.clarivate.cn/wos/woscc/citation-report/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log('Script started');

    // 计算g指数的函数
    function calculateGIndex(citations) {
        let sumcitations = 0;
        let i;
        for (i = 0; i < citations.length; i++) {
            sumcitations += citations[i];
            if (sumcitations < (i+1)*(i+1)) {
                break;
            }
        }
        return i + 1;
    }

    // 等待页面完全加载
    window.onload = function() {
        // 添加一个延时函数，等待2秒后再运行脚本
        setTimeout(function() {
            try {
                // 获取所有引用
                // var citationElements = document.querySelectorAll("a.ng-star-inserted");
                var citationElements = document.querySelectorAll("#snPubs > table > tr > td:nth-child(8) > a")
                // document.querySelector("#snPubs > table > tr:nth-child(6) > td:nth-child(8) > a")
                console.log('Citation elements:', citationElements);
                var citations = Array.from(citationElements).map(el => Number(el.textContent));
                console.log('Citations:', citations);
                var gIndex = calculateGIndex(citations);
                console.log('G-index:', gIndex);

                // 创建一个新的div作为浮动窗口
                var floatWindow = document.createElement('div');
                floatWindow.textContent = 'G-index: ' + gIndex;
                floatWindow.style.position = 'fixed';
                floatWindow.style.top = '120px';
                floatWindow.style.right = '10px';
                floatWindow.style.padding = '10px';
                floatWindow.style.backgroundColor = 'white';
                floatWindow.style.border = '1px solid black';
                // 将浮动窗口添加到body
                document.body.appendChild(floatWindow);
            } catch (error) {
                console.log('An error occurred:', error);
            }
        }, 3000);
        };
    console.log('Script ended');
})();