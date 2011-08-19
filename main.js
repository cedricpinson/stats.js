/** -*- compile-command: "jslint-cli main.js" -*-
 *
 * Copyright (C) 2010 Cedric Pinson
 *
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Authors:
 *  Cedric Pinson <cedric.pinson@plopbyte.net>
 *
 */

var CanvasSize;

var requestAnimationFrame;
function setupRequestAnimationFrame () {
    if (window.webkitRequestAnimationFrame !== undefined) {
        console.log("use webkitRequestAnimationFrame");
        requestAnimationFrame = window.webkitRequestAnimationFrame;
    }
    if (window.mozRequestAnimationFrame !== undefined) {
        console.log("use mozRequestAnimationFrame");
        requestAnimationFrame = window.mozRequestAnimationFrame;
    }
    
    if (requestAnimationFrame === undefined) {
        requestAnimationFrame = function(cb) {
            setTimeout(cb, 1000.0/60.0);
        };
    }
}

function initStats0() 
{
    var canvas = document.getElementById("fps_memory");
    var height = canvas.height;
    var getter0 = function (t) {
        return Math.random() * height;
    };

    var getter1 = function(t) {
        var size = height/2.0 + Math.cos(t/1000)*height*0.5;
        return size;
    };

    var stats = new Stats.Stats(canvas);
    stats.addLayer(jQuery("#random").css("color"), getter0);
    stats.addLayer(jQuery("#cos").css("color"), getter1);
    return stats;
}

function initStats1() 
{
    var canvas = document.getElementById("update_cull_draw");
    var height = canvas.height;
    var getter0 = function (t) {
        return Math.random() * height;
    };

    var getter1 = function(t) {
        var size = height/2.0 + Math.sin(t/1000)*height*0.5;
        return size;
    };

    var stats = new Stats.Stats(canvas);
    stats.addLayer(jQuery("#random2").css("color"), getter0);
    stats.addLayer(jQuery("#sin").css("color"), getter1);
    return stats;
}

function setupStats() {

    setupRequestAnimationFrame();

    var stats = [];
    stats.push(initStats0());
    stats.push(initStats1());

    var loop = function() {
        for (var i = 0; i < stats.length; i++) {
            stats[i].update();
        }
        requestAnimationFrame(loop);
    };

    loop();
}
