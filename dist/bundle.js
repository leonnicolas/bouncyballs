/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Bubble.ts":
/*!***********************!*\
  !*** ./src/Bubble.ts ***!
  \***********************/
/*! exports provided: Bubble */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bubble", function() { return Bubble; });
/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shape */ "./src/shape.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Bubble = /** @class */ (function (_super) {
    __extends(Bubble, _super);
    function Bubble(center, x_vel, y_vel, world) {
        var _this = _super.call(this, center, x_vel, y_vel, world) || this;
        _this.name = "Bubble";
        _this.radius = 30;
        _this.friction = 0.005;
        _this.gravity = -0.05;
        _this.ttl = 500;
        _this.noCollide = 5;
        _this.collisions = 0;
        _this.MAXCOLLISIONS = 2;
        return _this;
    }
    Bubble.prototype.draw = function (ctx) {
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    };
    Bubble.prototype.takeStep = function () {
        if (this.noCollide != 0)
            this.noCollide--;
        if (!this.isHit)
            _super.prototype.takeStep.call(this);
        else {
            this.y_vel *= (1 - this.friction);
            this.x_vel *= (1 - this.friction);
            this.y_vel -= this.gravity;
            if (Math.abs(this.x_vel) + Math.abs(this.y_vel) < 0.1 && this.ttl-- <= 0)
                this.isdead = true;
            _super.prototype.takeStep.call(this);
        }
    };
    Bubble.prototype.includesPoint = function (p) {
        return this.getShortestDistanceTo(p) <= 0;
    };
    Bubble.prototype.getShortestDistanceTo = function (p) {
        return this.getDistanceToCenter(p) - this.radius;
    };
    Bubble.prototype.getRadius = function () {
        return this.radius;
    };
    Bubble.prototype.collide = function (shape) {
        if (this.noCollide != 0)
            return;
        this.noCollide = 5;
        if (++this.collisions == this.MAXCOLLISIONS || ++shape.collisions == this.MAXCOLLISIONS) {
            this.isbroken = true;
            shape.isbroken = true;
        }
        var rel_v_x = this.x_vel - shape.x_vel;
        var rel_v_y = this.y_vel - shape.y_vel;
        var rel_v = Math.sqrt(Math.pow(rel_v_x, 2) + Math.pow(rel_v_y, 2));
        var abstands = new _shape__WEBPACK_IMPORTED_MODULE_0__["Point"](this.center.x - shape.center.x, this.center.y - shape.center.y);
        var angle = Math.acos((abstands.x * rel_v_x + abstands.y * rel_v_y) / (Math.sqrt(Math.pow(abstands.x, 2) + Math.pow(abstands.y, 2)) * Math.sqrt(Math.pow(rel_v_y, 2) + Math.pow(rel_v_x, 2))));
        var rel_v2_x_new = Math.pow(Math.cos(angle), 2) * rel_v;
        var rel_v2_y_new = Math.cos(angle) * Math.sin(angle) * rel_v;
        var rel_v_x_new = Math.pow(Math.sin(angle), 2) * rel_v;
        var rel_v_y_new = Math.sin(angle) * Math.cos(angle) * rel_v;
        this.x_vel = 0.95 * (shape.x_vel + rel_v_x_new);
        this.y_vel = 0.95 * (shape.y_vel + rel_v_y_new);
        shape.x_vel += rel_v_x;
        shape.y_vel += rel_v_y;
        shape.x_vel *= 0.95;
        shape.y_vel *= 0.95;
        if (shape.x_vel == NaN || shape.y_vel == NaN)
            shape.isbroken;
        if (this.x_vel == NaN || this.y_vel == NaN)
            this.isbroken;
    };
    return Bubble;
}(_shape__WEBPACK_IMPORTED_MODULE_0__["Shape"]));



/***/ }),

/***/ "./src/Canvas.ts":
/*!***********************!*\
  !*** ./src/Canvas.ts ***!
  \***********************/
/*! exports provided: World, Canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "World", function() { return World; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Canvas", function() { return Canvas; });
/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shape */ "./src/shape.ts");
/* harmony import */ var _Bubble__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bubble */ "./src/Bubble.ts");
/* harmony import */ var _TinyBubble__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TinyBubble */ "./src/TinyBubble.ts");



var World = /** @class */ (function () {
    function World(x, y) {
        this.xMax = x;
        this.yMax = y;
    }
    return World;
}());

var Canvas = /** @class */ (function () {
    function Canvas() {
        var _this = this;
        this.shapes = [];
        this.color = "rgb(47, 79, 79)";
        this.canvas = document.getElementById("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.world = new World(this.canvas.width, this.canvas.height);
        //this.shapes.push(new Bubble(new Point(100, 100), 1, 1, world));
        document.getElementById('canvas').addEventListener('click', function (event) {
            //console.log(event);
            var hit = false;
            var p = new _shape__WEBPACK_IMPORTED_MODULE_0__["Point"](event.x, event.y);
            _this.shapes.forEach(function (e, i, a) {
                if (e.includesPoint(p)) {
                    //a.splice(i, 1);
                    e.takeHit();
                    hit = true;
                }
            });
            if (!hit)
                _this.shapes.push(new _Bubble__WEBPACK_IMPORTED_MODULE_1__["Bubble"](new _shape__WEBPACK_IMPORTED_MODULE_0__["Point"](event.x, event.y), Math.random() * 2 - 1, Math.random() * 2 - 1, _this.world));
        });
    }
    Canvas.prototype.start = function () {
        var _this = this;
        if (this.canvas.getContext) {
            var ctx_1 = this.canvas.getContext("2d");
            setInterval(function () {
                _this.clearCanvas(ctx_1);
                // delete dead shapes
                _this.shapes = _this.shapes.filter(function (e) {
                    if (e.isdead)
                        return false;
                    else
                        return true;
                });
                // handle broken shapes
                for (var i = 0; i < _this.shapes.length; i++) {
                    if (_this.shapes[i].isbroken && _this.shapes[i].name == "Bubble") {
                        _this.shapes[i].isdead = true;
                        for (var j = 0; j < 5; j++) {
                            console.log(_this.shapes);
                            _this.shapes.push(new _TinyBubble__WEBPACK_IMPORTED_MODULE_2__["TinyBubble"](new _shape__WEBPACK_IMPORTED_MODULE_0__["Point"](_this.shapes[i].center.x, _this.shapes[i].center.y), Math.random() * 2 - 1, Math.random() * 2 - 1, _this.world));
                        }
                    }
                }
                //take steps and draw
                for (var i = 0; i < _this.shapes.length; i++) {
                    _this.shapes[i].takeStep();
                    _this.shapes[i].draw(ctx_1);
                }
                for (var i = 0; i < _this.shapes.length; i++) {
                    for (var j = i + 1; j < _this.shapes.length; j++) {
                        //console.log("i=" + i + " j=" + j)
                        if (_this.isCollision(_this.shapes[i], _this.shapes[j])) {
                            _this.shapes[i].collide(_this.shapes[j]);
                        }
                    }
                }
            }, 25);
        }
    };
    Canvas.prototype.clearCanvas = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Canvas.prototype.isCollision = function (s1, s2) {
        //to save resources calculating the sqrt
        var distance_approx_x = Math.abs(s1.center.x - s2.center.x);
        var distance_approx_y = Math.abs(s1.center.y - s2.center.y);
        if (distance_approx_x > s1.getRadius() + s2.getRadius() || distance_approx_y > s1.getRadius() + s2.getRadius())
            return false;
        var distance = Math.sqrt(Math.pow(s1.center.x - s2.center.x, 2) + Math.pow(s1.center.y - s2.center.y, 2));
        if (distance <= s1.getRadius() + s2.getRadius()) {
            return true;
        }
        else
            return false;
    };
    return Canvas;
}());



/***/ }),

/***/ "./src/TinyBubble.ts":
/*!***************************!*\
  !*** ./src/TinyBubble.ts ***!
  \***************************/
/*! exports provided: TinyBubble */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TinyBubble", function() { return TinyBubble; });
/* harmony import */ var _Bubble__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bubble */ "./src/Bubble.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var TinyBubble = /** @class */ (function (_super) {
    __extends(TinyBubble, _super);
    function TinyBubble(center, x_vel, y_vel, world) {
        var _this = _super.call(this, center, x_vel, y_vel, world) || this;
        _this.name = "TinyBubble";
        _this.radius = 10;
        _this.MAXCOLLISIONS = 100;
        _this.isHit = true;
        _this.friction = 0.01;
        _this.noCollide = 100;
        return _this;
    }
    return TinyBubble;
}(_Bubble__WEBPACK_IMPORTED_MODULE_0__["Bubble"]));



/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas */ "./src/Canvas.ts");

var canvas = new _Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"]();
canvas.start();


/***/ }),

/***/ "./src/shape.ts":
/*!**********************!*\
  !*** ./src/shape.ts ***!
  \**********************/
/*! exports provided: Point, Shape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return Point; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Shape", function() { return Shape; });
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());

var Shape = /** @class */ (function () {
    function Shape(center, x_vel, y_vel, world) {
        this.isHit = false;
        this.isbroken = false;
        this.isdead = false;
        this.collisions = 0;
        this.name = "Shape";
        this.center = center;
        this.x_vel = x_vel;
        this.y_vel = y_vel;
        this.world = world;
    }
    Shape.prototype.getCenter = function () {
        return this.center;
    };
    Shape.prototype.takeStep = function () {
        var newX = this.center.x += this.x_vel;
        var newY = this.center.y += this.y_vel;
        this.bounce(newX, newY);
        this.moveCenter(this.x_vel, this.y_vel);
    };
    Shape.prototype.bounce = function (newX, newY) {
        if (newX > this.world.xMax - this.getRadius())
            this.x_vel *= -1;
        if (newX < 0 + this.getRadius())
            this.x_vel *= -1;
        if (newY > this.world.yMax - this.getRadius())
            this.y_vel *= -1;
        if (newY < 0 + this.getRadius())
            this.y_vel *= -1;
    };
    Shape.prototype.moveCenter = function (x, y) {
        this.center.x += x;
        this.center.y += y;
    };
    Shape.prototype.getDistanceToCenter = function (p) {
        return Math.sqrt(Math.pow(this.center.x - p.x, 2) + Math.pow(this.center.y - p.y, 2));
    };
    Shape.prototype.takeHit = function () {
        this.isHit = true;
    };
    return Shape;
}());



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0J1YmJsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2FudmFzLnRzIiwid2VicGFjazovLy8uL3NyYy9UaW55QnViYmxlLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRnFDO0FBR3JDO0lBQTRCLDBCQUFLO0lBU2pDLGdCQUFZLE1BQWEsRUFBRSxLQUFZLEVBQUUsS0FBYSxFQUFFLEtBQVk7UUFBcEUsWUFDSSxrQkFBTSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsU0FDckM7UUFWRyxVQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ2hCLFlB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QUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakUsSUFBSSxRQUFRLEdBQUcsSUFBSSw0Q0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEYsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNMLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDdkQsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM3RCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3RELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFH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O1FBQ3JCLElBQUksSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzNCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNELDBCQUFVLEdBQVYsVUFBVyxDQUFTLEVBQUUsQ0FBUztRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxtQ0FBbUIsR0FBbkIsVUFBb0IsQ0FBUTtRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFDRCx1QkFBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQU1MLFlBQUM7QUFBRCxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHtQb2ludCwgU2hhcGV9IGZyb20gJy4vc2hhcGUnO1xuaW1wb3J0IHsgV29ybGQgfSBmcm9tICcuL0NhbnZhcyc7XG5cbmV4cG9ydCBjbGFzcyBCdWJibGUgZXh0ZW5kcyBTaGFwZXtcbiAgICBuYW1lID0gXCJCdWJibGVcIjtcbiAgICByYWRpdXM6IG51bWJlciA9IDMwO1xuICAgIGZyaWN0aW9uOiBudW1iZXIgPSAwLjAwNTtcbiAgICBncmF2aXR5OiBudW1iZXIgPSAtMC4wNTtcbiAgICB0dGw6IG51bWJlciA9IDUwMDtcbiAgICBub0NvbGxpZGUgPSA1O1xuICAgIGNvbGxpc2lvbnMgPSAwO1xuICAgIE1BWENPTExJU0lPTlM6IG51bWJlciA9IDI7XG5jb25zdHJ1Y3RvcihjZW50ZXI6IFBvaW50LCB4X3ZlbDpudW1iZXIgLHlfdmVsOiBudW1iZXIsIHdvcmxkOiBXb3JsZCkge1xuICAgIHN1cGVyKGNlbnRlciwgeF92ZWwsIHlfdmVsLCB3b3JsZCk7XG59XG4gICAgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2IoMjAwLDAsMClcIjtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHRoaXMuY2VudGVyLnggLCB0aGlzLmNlbnRlci55ICAsIHRoaXMucmFkaXVzICwgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgIH1cblxuICAgIHRha2VTdGVwKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5ub0NvbGxpZGUgIT0wKVxuICAgICAgICAgICAgdGhpcy5ub0NvbGxpZGUgLS07XG4gICAgICAgIGlmICghdGhpcy5pc0hpdClcbiAgICAgICAgICAgIHN1cGVyLnRha2VTdGVwKCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy55X3ZlbCAqPSAoMSAtIHRoaXMuZnJpY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy54X3ZlbCAqPSAoMSAtIHRoaXMuZnJpY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy55X3ZlbCAtPSB0aGlzLmdyYXZpdHk7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy54X3ZlbCkgKyBNYXRoLmFicyh0aGlzLnlfdmVsKSA8IDAuMSAmJiB0aGlzLnR0bCAtLSA8PSAwIClcbiAgICAgICAgICAgICAgICB0aGlzLmlzZGVhZCA9IHRydWU7XG4gICAgICAgICAgICBzdXBlci50YWtlU3RlcCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5jbHVkZXNQb2ludChwOiBQb2ludCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTaG9ydGVzdERpc3RhbmNlVG8ocCkgPD0gMDtcbiAgICB9XG5cblxuICAgIGdldFNob3J0ZXN0RGlzdGFuY2VUbyhwOiBQb2ludCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpc3RhbmNlVG9DZW50ZXIocCkgLSB0aGlzLnJhZGl1cztcbiAgICB9XG5cbiAgICBnZXRSYWRpdXMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmFkaXVzO1xuICAgIH1cbiAgICBjb2xsaWRlKHNoYXBlOiBTaGFwZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5ub0NvbGxpZGUgIT0gMClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5ub0NvbGxpZGUgPSA1O1xuICAgICAgICBpZiAoKyt0aGlzLmNvbGxpc2lvbnMgPT0gdGhpcy5NQVhDT0xMSVNJT05TIHx8ICsrc2hhcGUuY29sbGlzaW9ucyA9PSB0aGlzLk1BWENPTExJU0lPTlMpe1xuICAgICAgICAgICAgdGhpcy5pc2Jyb2tlbiA9IHRydWU7XG4gICAgICAgICAgICBzaGFwZS5pc2Jyb2tlbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlbF92X3ggPSB0aGlzLnhfdmVsIC0gc2hhcGUueF92ZWw7XG4gICAgICAgIGxldCByZWxfdl95ID0gdGhpcy55X3ZlbCAtIHNoYXBlLnlfdmVsO1xuICAgICAgICBsZXQgcmVsX3YgPSBNYXRoLnNxcnQoTWF0aC5wb3cocmVsX3ZfeCwyKSArIE1hdGgucG93KHJlbF92X3ksMikpO1xuICAgICAgICBsZXQgYWJzdGFuZHMgPSBuZXcgUG9pbnQodGhpcy5jZW50ZXIueCAtIHNoYXBlLmNlbnRlci54LHRoaXMuY2VudGVyLnkgLSBzaGFwZS5jZW50ZXIueSk7XG4gICAgICAgIGxldCBhbmdsZSA9IE1hdGguYWNvcygoYWJzdGFuZHMueCAqIHJlbF92X3ggKyBhYnN0YW5kcy55ICogcmVsX3ZfeSkgLyAoTWF0aC5zcXJ0KE1hdGgucG93KGFic3RhbmRzLngsMikgKyBNYXRoLnBvdyhhYnN0YW5kcy55LDIpKSAqIE1hdGguc3FydChNYXRoLnBvdyhyZWxfdl95LDIpICsgTWF0aC5wb3cocmVsX3ZfeCwyKSkpKTtcbiAgICAgICAgbGV0IHJlbF92Ml94X25ldyA9IE1hdGgucG93KE1hdGguY29zKGFuZ2xlKSwyKSAqIHJlbF92O1xuICAgICAgICBsZXQgcmVsX3YyX3lfbmV3ID0gTWF0aC5jb3MoYW5nbGUpICogTWF0aC5zaW4oYW5nbGUpICogcmVsX3Y7XG4gICAgICAgIGxldCByZWxfdl94X25ldyA9IE1hdGgucG93KE1hdGguc2luKGFuZ2xlKSwyKSAqIHJlbF92O1xuICAgICAgICBsZXQgcmVsX3ZfeV9uZXcgPSBNYXRoLnNpbihhbmdsZSkgKiBNYXRoLmNvcyhhbmdsZSkgKiByZWxfdjtcbiAgICAgICAgdGhpcy54X3ZlbCA9IDAuOTUqKHNoYXBlLnhfdmVsICsgcmVsX3ZfeF9uZXcpO1xuICAgICAgICB0aGlzLnlfdmVsID0gMC45NSooc2hhcGUueV92ZWwgKyByZWxfdl95X25ldyk7XG4gICAgICAgIHNoYXBlLnhfdmVsICs9IHJlbF92X3g7XG4gICAgICAgIHNoYXBlLnlfdmVsICs9IHJlbF92X3k7XG4gICAgICAgIHNoYXBlLnhfdmVsICo9IDAuOTU7XG4gICAgICAgIHNoYXBlLnlfdmVsICo9MC45NTtcbiAgICAgICAgaWYgKHNoYXBlLnhfdmVsID09IE5hTiB8fCBzaGFwZS55X3ZlbCA9PSBOYU4pXG4gICAgICAgICAgICBzaGFwZS5pc2Jyb2tlbjtcbiAgICAgICAgaWYgKHRoaXMueF92ZWwgPT0gTmFOIHx8IHRoaXMueV92ZWwgPT0gTmFOKVxuICAgICAgICAgICAgdGhpcy5pc2Jyb2tlbjtcbiAgICB9XG59XG4iLCJpbXBvcnQge1BvaW50LCBTaGFwZX0gZnJvbSBcIi4vc2hhcGVcIjtcbmltcG9ydCB7QnViYmxlfSBmcm9tIFwiLi9CdWJibGVcIjtcbmltcG9ydCB7VGlueUJ1YmJsZX0gZnJvbSBcIi4vVGlueUJ1YmJsZVwiO1xuXG5leHBvcnQgY2xhc3MgV29ybGQge1xuICAgIHhNYXg6IG51bWJlcjtcbiAgICB5TWF4OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICB0aGlzLnhNYXggPSB4O1xuICAgICAgICB0aGlzLnlNYXggPSB5O1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhbnZhcyB7XG4gICAgc2hhcGVzOiBTaGFwZVtdID0gW107XG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICB3b3JsZDogV29ybGQ7XG4gICAgY29sb3I6IHN0cmluZyA9IFwicmdiKDQ3LCA3OSwgNzkpXCI7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIHRoaXMud29ybGQgPSBuZXcgV29ybGQodGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICAgIC8vdGhpcy5zaGFwZXMucHVzaChuZXcgQnViYmxlKG5ldyBQb2ludCgxMDAsIDEwMCksIDEsIDEsIHdvcmxkKSk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhldmVudCk7XG4gICAgICAgICAgICBsZXQgaGl0ID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgcCA9IG5ldyBQb2ludChldmVudC54LCBldmVudC55KTtcbiAgICAgICAgICAgIHRoaXMuc2hhcGVzLmZvckVhY2goKGUsaSxhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGUuaW5jbHVkZXNQb2ludChwKSkge1xuICAgICAgICAgICAgICAgICAgICAvL2Euc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICBlLnRha2VIaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgaGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAoIWhpdClcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXBlcy5wdXNoKG5ldyBCdWJibGUobmV3IFBvaW50KGV2ZW50LngsIGV2ZW50LnkpLE1hdGgucmFuZG9tKCkqMiAtMSAsIE1hdGgucmFuZG9tKCkqMiAtIDEsIHRoaXMud29ybGQpKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGFydCgpOiB2b2lkIHtcblxuICAgICAgICBpZiAodGhpcy5jYW52YXMuZ2V0Q29udGV4dCkge1xuICAgICAgICAgICAgbGV0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKGN0eCk7XG4gICAgICAgICAgICAgICAgLy8gZGVsZXRlIGRlYWQgc2hhcGVzXG4gICAgICAgICAgICAgICAgdGhpcy5zaGFwZXMgPSB0aGlzLnNoYXBlcy5maWx0ZXIoIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmlzZGVhZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gaGFuZGxlIGJyb2tlbiBzaGFwZXNcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCB0aGlzLnNoYXBlcy5sZW5ndGggOyBpKysgKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hhcGVzW2ldLmlzYnJva2VuICYmIHRoaXMuc2hhcGVzW2ldLm5hbWUgPT0gXCJCdWJibGVcIil7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhcGVzW2ldLmlzZGVhZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKCBsZXQgaiA9IDAgOyBqIDwgNSA7IGorKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zaGFwZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFwZXMucHVzaChuZXcgVGlueUJ1YmJsZShuZXcgUG9pbnQodGhpcy5zaGFwZXNbaV0uY2VudGVyLngsIHRoaXMuc2hhcGVzW2ldLmNlbnRlci55KSxNYXRoLnJhbmRvbSgpKjIgLTEgLCBNYXRoLnJhbmRvbSgpKjIgLTEsIHRoaXMud29ybGQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL3Rha2Ugc3RlcHMgYW5kIGRyYXdcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCB0aGlzLnNoYXBlcy5sZW5ndGggOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhcGVzW2ldLnRha2VTdGVwKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhcGVzW2ldLmRyYXcoY3R4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgdGhpcy5zaGFwZXMubGVuZ3RoIDsgaSsrICl7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBpICsgMSA7IGogPCB0aGlzLnNoYXBlcy5sZW5ndGggIDsgaisrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJpPVwiICsgaSArIFwiIGo9XCIgKyBqKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb2xsaXNpb24odGhpcy5zaGFwZXNbaV0sIHRoaXMuc2hhcGVzW2pdKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFwZXNbaV0uY29sbGlkZSh0aGlzLnNoYXBlc1tqXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyNSk7XG5cblxuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyQ2FudmFzKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwwLCB0aGlzLmNhbnZhcy53aWR0aCAsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgfVxuICAgIGlzQ29sbGlzaW9uKHMxOiBTaGFwZSwgczI6IFNoYXBlKTogYm9vbGVhbntcbiAgICAgICAgLy90byBzYXZlIHJlc291cmNlcyBjYWxjdWxhdGluZyB0aGUgc3FydFxuICAgICAgICBsZXQgZGlzdGFuY2VfYXBwcm94X3ggPSBNYXRoLmFicyhzMS5jZW50ZXIueCAtIHMyLmNlbnRlci54KTtcbiAgICAgICAgbGV0IGRpc3RhbmNlX2FwcHJveF95ID0gTWF0aC5hYnMoczEuY2VudGVyLnkgLSBzMi5jZW50ZXIueSk7XG4gICAgICAgIGlmIChkaXN0YW5jZV9hcHByb3hfeCAgPiBzMS5nZXRSYWRpdXMoKSArIHMyLmdldFJhZGl1cygpIHx8IGRpc3RhbmNlX2FwcHJveF95ICA+IHMxLmdldFJhZGl1cygpICsgczIuZ2V0UmFkaXVzKCkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGxldCBkaXN0YW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyhzMS5jZW50ZXIueCAtIHMyLmNlbnRlci54LDIpICsgTWF0aC5wb3coczEuY2VudGVyLnkgLSBzMi5jZW50ZXIueSwgMikpO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPD0gczEuZ2V0UmFkaXVzKCkgKyBzMi5nZXRSYWRpdXMoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiIsImltcG9ydCB7QnViYmxlfSBmcm9tICcuL0J1YmJsZSc7XG5pbXBvcnQge1BvaW50fSBmcm9tIFwiLi9zaGFwZVwiO1xuaW1wb3J0IHtXb3JsZH0gZnJvbSBcIi4vQ2FudmFzXCI7XG5cbmV4cG9ydCBjbGFzcyBUaW55QnViYmxlIGV4dGVuZHMgQnViYmxlIHtcbiAgICBuYW1lID0gXCJUaW55QnViYmxlXCI7XG4gICAgcmFkaXVzIDogbnVtYmVyID0gMTA7XG4gICAgTUFYQ09MTElTSU9OUyA9IDEwMDtcbiAgICBpc0hpdCA9IHRydWU7XG4gICAgZnJpY3Rpb24gPSAwLjAxO1xuICAgIGNvbnN0cnVjdG9yKGNlbnRlcjogUG9pbnQsIHhfdmVsOm51bWJlciAseV92ZWw6IG51bWJlciwgd29ybGQ6IFdvcmxkKSB7XG4gICAgICAgIHN1cGVyKGNlbnRlciwgeF92ZWwsIHlfdmVsLCB3b3JsZCk7XG4gICAgICAgIHRoaXMubm9Db2xsaWRlID0gMTAwO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENhbnZhcyB9IGZyb20gJy4vQ2FudmFzJztcblxubGV0IGNhbnZhcyA9IG5ldyBDYW52YXMoKTtcblxuY2FudmFzLnN0YXJ0KCk7XG4iLCJpbXBvcnQgeyBXb3JsZCB9IGZyb20gJy4vQ2FudmFzJztcblxuZXhwb3J0IGNsYXNzIFBvaW50IHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxufVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNoYXBlIHtcbiAgICBjZW50ZXI6IFBvaW50O1xuICAgIHhfdmVsOiBudW1iZXI7XG4gICAgeV92ZWw6IG51bWJlcjtcbiAgICB3b3JsZDogV29ybGQ7XG4gICAgaXNIaXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc2Jyb2tlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzZGVhZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGNvbGxpc2lvbnM6IG51bWJlciA9IDA7XG4gICAgbmFtZTogc3RyaW5nID0gXCJTaGFwZVwiO1xuICAgIGNvbnN0cnVjdG9yKGNlbnRlcjogUG9pbnQseF92ZWw6IG51bWJlciwgeV92ZWw6IG51bWJlciwgd29ybGQ6IFdvcmxkICkge1xuICAgICAgICB0aGlzLmNlbnRlciA9IGNlbnRlcjtcbiAgICAgICAgdGhpcy54X3ZlbCA9IHhfdmVsO1xuICAgICAgICB0aGlzLnlfdmVsID0geV92ZWw7XG4gICAgICAgIHRoaXMud29ybGQgPSB3b3JsZDtcbiAgICB9XG4gICAgZ2V0Q2VudGVyKCk6IFBvaW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2VudGVyXG4gICAgfVxuICAgIHRha2VTdGVwKCk6IHZvaWR7XG4gICAgICAgIGxldCBuZXdYID0gdGhpcy5jZW50ZXIueCArPSB0aGlzLnhfdmVsO1xuICAgICAgICBsZXQgbmV3WSA9IHRoaXMuY2VudGVyLnkgKz0gdGhpcy55X3ZlbDtcbiAgICAgICAgdGhpcy5ib3VuY2UobmV3WCxuZXdZKTtcbiAgICAgICAgdGhpcy5tb3ZlQ2VudGVyKHRoaXMueF92ZWwsIHRoaXMueV92ZWwpO1xuICAgIH1cbiAgICBib3VuY2UobmV3WDogbnVtYmVyLG5ld1k6IG51bWJlcik6dm9pZHtcbiAgICAgICAgaWYgKG5ld1ggPiB0aGlzLndvcmxkLnhNYXggLSB0aGlzLmdldFJhZGl1cygpKVxuICAgICAgICAgICAgdGhpcy54X3ZlbCAqPSAtMTtcbiAgICAgICAgaWYgKG5ld1ggPCAwICsgdGhpcy5nZXRSYWRpdXMoKSlcbiAgICAgICAgICAgIHRoaXMueF92ZWwgKj0gLTE7XG4gICAgICAgIGlmIChuZXdZID4gdGhpcy53b3JsZC55TWF4IC0gdGhpcy5nZXRSYWRpdXMoKSlcbiAgICAgICAgICAgIHRoaXMueV92ZWwgKj0gLTE7XG4gICAgICAgIGlmIChuZXdZIDwgMCArIHRoaXMuZ2V0UmFkaXVzKCkpXG4gICAgICAgICAgICB0aGlzLnlfdmVsICo9IC0xO1xuICAgIH1cbiAgICBtb3ZlQ2VudGVyKHg6IG51bWJlciwgeTogbnVtYmVyKXtcbiAgICAgICAgdGhpcy5jZW50ZXIueCArPSB4O1xuICAgICAgICB0aGlzLmNlbnRlci55ICs9IHk7XG4gICAgfVxuICAgIGdldERpc3RhbmNlVG9DZW50ZXIocDogUG9pbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuY2VudGVyLnggIC0gcC54LCAyKSArIE1hdGgucG93KHRoaXMuY2VudGVyLnkgLSBwLnkgLDIpKTtcbiAgICB9XG4gICAgdGFrZUhpdCgpOiB2b2lke1xuICAgICAgICB0aGlzLmlzSGl0ID0gdHJ1ZTtcbiAgICB9XG4gICAgYWJzdHJhY3QgZ2V0U2hvcnRlc3REaXN0YW5jZVRvKHA6IFBvaW50KTogbnVtYmVyO1xuICAgIGFic3RyYWN0IGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkO1xuICAgIGFic3RyYWN0IGluY2x1ZGVzUG9pbnQocDogUG9pbnQpOiBib29sZWFuO1xuICAgIGFic3RyYWN0IGdldFJhZGl1cygpOiBudW1iZXI7XG4gICAgYWJzdHJhY3QgY29sbGlkZShzaGFwZTogU2hhcGUpOiB2b2lkO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==