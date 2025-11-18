/**
 * iBooks JS Framework
 * Compatibility: iBooks 1.5+
 * Copyright © 2009-2014 Apple Inc.  All rights reserved.
 *
 **/

/**
 *  @name iBooks
 *  @namespace
 *
 *  Top-level object containing some core constants providing information about the environment.
 */
var iBooks = {};

/**
 *  Indicates the version of iBooks JS.
 *  @constant
 *  @type String
 */
iBooks.VERSION = '1.2';

/**
 *  Indicates whether the platform supports touches.
 *  @constant
 *  @type bool
 */
iBooks.SUPPORTS_TOUCHES = navigator.epubReadingSystem.hasFeature('touch-events');

/**
 *  The interaction start event name, returns <code>touchstart</code> if the platform supports touches
 *  and <code>mousedown</code> if it does not.
 *  @constant
 *  @type String
 */
iBooks.START_EVENT = iBooks.SUPPORTS_TOUCHES ? 'touchstart' : 'mousedown';

/**
 *  The interaction move event name, returns <code>touchmove</code> if the platform supports touches
 *  and <code>mousemove</code> if it does not.
 *  @constant
 *  @type String
 */
iBooks.MOVE_EVENT = iBooks.SUPPORTS_TOUCHES ? 'touchmove' : 'mousemove';

/**
 *  The interaction end event name, returns <code>touchend</code> if the platform supports touches
 *  and <code>mouseup</code> if it does not.
 *  @constant
 *  @type String
 */
iBooks.END_EVENT = iBooks.SUPPORTS_TOUCHES ? 'touchend' : 'mouseup';

/**
 *  The touch cancel event name.
 *  @constant
 *  @type String
 */
iBooks.CANCEL_EVENT = 'touchcancel';

/**
 *  The CSS selector for toggable elements.
 *  @constant
 *  @type String
 */
iBooks.TOGGLEABLE_CSS_SELECTOR = '.ibooks-toggleable';

/**
 *  The CSS selector for deferred event elements.
 *  @constant
 *  @type String
 */
iBooks.DEFERRED_EVENT_CSS_SELECTOR = '.ibooks-deferred-event';

/**
 *  The CSS selector for stampable elements.
 *  @constant
 *  @type String
 */
iBooks.STAMPABLE_CSS_SELECTOR = '.ibooks-stampable';

/**
 *  The CSS selector for media elements.
 *  @constant
 *  @type String
 */
iBooks.MEDIA_BASE_CSS_SELECTOR = '.ibooks-media';

/**
 *  The HTML attribute for the audio source
 *  @constant
 *  @type String
 */
iBooks.MEDIA_AUDIO_SOURCE_ATTRIBUTE = 'data-ibooks-audio-src';

/**
 *  The HTML attribute for the audio reset on play
 *  @constant
 *  @type String
 */
iBooks.MEDIA_AUDIO_RESET_ATTRIBUTE = 'data-ibooks-audio-reset-on-play';

/**
 *  The CSS class name appended to the <code>body</code> when media
 *  is playing.
 *  @constant
 *  @type String
 */
iBooks.MEDIA_PLAYING_CSS_CLASS = 'ibooks-media-playing';

/**
 *  The HTML attribute for pausing iBooks read aloud
 *  is playing.
 *  @constant
 *  @type String
 */
iBooks.MEDIA_PAUSE_READ_ALOUD_ATTRIBUTE = 'data-ibooks-pause-readaloud';

/**
 *  The CSS selector for draggable elements.
 *  @constant
 *  @type String
 */
iBooks.DRAGGABLE_CSS_SELECTOR = '.ibooks-draggable';

/**
 *  The CSS class name appended to the <code>body</code> when 
 *  a draggable element is being dragged.
 *  @constant
 *  @type String
 */
iBooks.ELEMENT_DRAGGING_CLASS = 'ibooks-element-is-dragging';


/**
 * iBooks base controller. 
 */
function iBooksBaseController(){
  // Set user configurable values and initialize our components
  this.initConfigurables();
  this.initComponents();
  
  // Provides a CSS class on DOMContentLoaded
  setTimeout(function(){
      document.body.addClassName(iBooks.CSS_CLASS_ON_LOAD);
  }, iBooks.BUILD_IN_EVENT_DELAY);
};


/**
 * Configuration of user defined constants.
 */
iBooksBaseController.prototype.initConfigurables = function() {
  // CSS class name on active elements
  iBooks.ACTIVE_CSS_CLASS = "active";
  
  // CSS class name appended to body on page load
  iBooks.CSS_CLASS_ON_LOAD = "build-in";    
  
  // Delay in milliseconds before deferred events fire
  iBooks.DEFERRED_EVENT_DELAY = 1000;
  
  // Delay in milliseconds before iBooks.CSS_CLASS_ON_LOAD is appended to body
  iBooks.BUILD_IN_EVENT_DELAY = 1000;

  // Tap threshold value, in pixels
  iBooks.TAP_THRESHOLD = 10;

  // CSS selector for page
  iBooks.PAGE_CSS_SELECTOR = ".page";

  // CSS class for stamped elements
  iBooks.STAMPED_ELEMENT_CSS_CLASS = "stamp";
};


/**
 * Initializes iBooks JS components
 */
iBooksBaseController.prototype.initComponents = function() {
  this.deferredEvent = new iBooksDeferredEventController();
  this.draggables = new iBooksDraggablesBaseController();
  this.media = new iBooksMediaController();
  this.stampables = new iBooksStampablesBaseController();
  this.toggleables = new iBooksToggleablesBaseController();
};


/**
 * On DOM content loaded, instantiate the iBook base controller
 */
window.addEventListener("DOMContentLoaded", function() {
  window.iBookController = new iBooksBaseController();
}, false);

/* ==================== TRANSFORMS SHORTHANDS ==================== */

iBooks.Utils = {};

/**
 *  Prints a <code>translate3d()</code> command that can be used as input for a <code>-webkit-transform</code> property.
 *  
 *  @param {int} tx The x coordinate for the translation.
 *  @param {int} ty The y coordinate for the translation
 *
 *  @returns {String} The <code>translate3d()</code> command
 */
iBooks.Utils.t = function (tx, ty) {
  return iBooks.Utils.t3d(tx, ty, 0);
};

/**
 *  Prints a <code>translate3d()</code> command that can be used as input for a <code>-webkit-transform</code> property.
 *  
 *  @param {int} tx The x coordinate for the translation.
 *  @param {int} ty The y coordinate for the translation
 *  @param {int} tz The z coordinate for the translation
 *
 *  @returns {String} The <code>translate3d()</code> command
 */
iBooks.Utils.t3d = function (tx, ty, tz) {
  return 'translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
};

/**
 *  Prints a <code>rotate3d()</code> command that can be used as input for a <code>-webkit-transform</code> property.
 *  
 *  @param {int} x The x component of the rotation vector
 *  @param {int} y The y component of the rotation vector
 *  @param {int} z The z component of the rotation vector
 *  @param {int} angle The angle in radians for the rotation
 *
 *  @returns {String} The <code>rotate3d()</code> command
 */
iBooks.Utils.r3d = function (x, y, z, angle) {
  return 'rotate3d(' + x + ', ' + y + ', ' + z + ', ' + angle + 'rad)';
};

/**
 *  Creates a CSS string representation for a number in pixels.
 *  
 *  @param {number} value The value to be converted.
 *
 *  @returns {String} A CSS string representation for <code>value</code> in pixels.
 */
iBooks.Utils.px = function (value) {
  return value + 'px';
};

/**
 *  Gets the X value we want to use from a MouseEvent or TouchEvent, depending on the capabilities of the platform.
 *  This value is meant only to test deltas between start and end events.  It may return different values for touch
 *  than for mouse events.
 *  
 *  @param {Event} value The MouseEvent or TouchEvent to be queried.
 *
 *  @returns {number} A CSS string representation for <code>value</code> in pixels.
 */
iBooks.Utils.eventCanonicalX = function (e) {
  return iBooks.SUPPORTS_TOUCHES ? e.changedTouches[0].pageX : e.clientX;
};

/**
 *  Gets the X value we want to use from a MouseEvent or TouchEvent, depending on the capabilities of the platform.
 *  This value is meant only to test deltas between start and end events.  It may return different values for touch
 *  than for mouse events.
 *  
 *  @param {Event} value The MouseEvent or TouchEvent to be queried.
 *
 *  @returns {number} the "canonical" Y value of the event.
 */
iBooks.Utils.eventCanonicalY = function (e) {
  return iBooks.SUPPORTS_TOUCHES ? e.changedTouches[0].pageY : e.clientY;
};

/**
 *  Indicates whether the element has a given class name within its <code>class</code> attribute.
 *
 *  @param {String} className The CSS class name.
 *  @returns {bool} Whether the element has this class name within its <code>class</code> attribute.
 *  @memberOf Element.prototype
 */
Element.prototype.hasClassName = function (className) {
  return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(this.className);
};

/**
 *  Adds the given class name to the element's <code>class</code> attribute if it's not already there.
 *
 *  @param {String} className The CSS class name.
 *  @returns {bool} Whether the class was actually added to the element if it weren't present before addition.
 *  @memberOf Element.prototype
 */
Element.prototype.addClassName = function (className) {
  if (!this.hasClassName(className)) {
    this.className = [this.className, className].join(' ');
    return true;
  }
  else {
    return false;
  }
};

/**
 *  Removes the given class name from the element's <code>class</code> attribute if it's there.
 *
 *  @param {String} className The CSS class name.
 *  @returns {bool} Whether the class was actually removed from the element if it were present before removal.
 *  @memberOf Element.prototype
 */
Element.prototype.removeClassName = function (className) {
  if (this.hasClassName(className)) {
    var curClasses = this.className;
    this.className = curClasses.replace(new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)', 'g'), ' ');
    return true;
  }
  return false;
};

/**
 *  Adds or removes the given class name from the element's <code>class</code> attribute based on a condition. If no
 *  condition is set, the class will be added if it is not already present and removed if it is.
 *
 *  @param {String} className The CSS class name.
 *  @param {Boolean} [condition] Whether to add or remove the class (true adds the class, false removes).
 *  @memberOf Element.prototype
 */
Element.prototype.toggleClassName = function (className, condition) {
  if (condition == null) {
    condition = !this.hasClassName(className);
  }
  this[condition ? 'addClassName' : 'removeClassName'](className);
};

/* ==================== DEFERRED EVENTS CONTROLLER ==================== */

/**
 * Deferred events controller interates through all elements with 
 * CSS class name <code>iBooks.DEFERRED_EVENT_CSS_SELECTOR</code>. 
 *
 * Once found, the <code>iBooks.ACTIVE_CSS_CLASS</code> is appended
 * to the CSS class name with a delay of <code>iBooks.DEFERRED_EVENT_DELAY</code>ms.
 *
 * User defined event delays can be set with the HTML <code>data-deferred-event-delay</code> attribute.
 */
function iBooksDeferredEventController(){
  var deferredElements = document.querySelectorAll(iBooks.DEFERRED_EVENT_CSS_SELECTOR),
      deferredElementsLength = deferredElements.length,
      deferredEventDelay;
      
  for (var i=0; i < deferredElementsLength; i++) {
    deferredEventDelay = deferredElements[i].getAttribute("data-deferred-event-delay");
    deferredEventDelay = (deferredEventDelay === null) ? iBooks.DEFERRED_EVENT_DELAY : deferredEventDelay;

    setTimeout(function(index, eventDelay){
      return function(){
        deferredElements[index].addClassName(iBooks.ACTIVE_CSS_CLASS);
      };
    }(i), deferredEventDelay);
  }
  
};

/* ==================== MEDIA CONTROLLER ==================== */

/**
 * Media controller interates through all elements with 
 * CSS class name <code>iBooks.MEDIA_BASE_CSS_SELECTOR</code>. 
 *
 * Once found, either <code>iBooksAudioController</code> or 
 * <code>iBooksVideoController</code> will be instantiated
 * for each element.
 */
function iBooksMediaController() {
  var mediaElements,
      mediaElementsLength,
      supportedMediaTypes,
      supportedMediaLength;

  //this.allMedia = [];
  supportedMediaTypes = ["audio", "video"];
  supportedMediaTypesLength = supportedMediaTypes.length;
  for (var i = supportedMediaTypesLength - 1; i >= 0; i--){
      mediaElements = document.querySelectorAll(iBooks.MEDIA_BASE_CSS_SELECTOR+"-"+supportedMediaTypes[i]);

      // A media element isn't always present, in that case continue the loop
      if(mediaElements == undefined){ continue; }

      mediaElementsLength = mediaElements.length;
      for (var j = mediaElementsLength - 1; j >= 0; j--){
        new iBooksAudioController(mediaElements[j]);
      };
  };  
};

/**
 *  This is called when we've found a valid iBooks media HTML element.
 *  
 *  By default, audio will pause itself on touch, then resume playing when touched again.
 *  To reset the audio track, include the HTML attribute <code>iBooks.MEDIA_AUDIO_RESET_ATTRIBUTE</code>
 *  and set the value to equal to <code>true<code>.
 *
 *  For example:
 *  <div class="ibooks-media-audio" data-ibooks-audio-src="audio/src.m4a">Play audio</div>
 *
 *  @property {Object} element The required object to instantiate the <code>iBooksDraggableController</code>
 */
function iBooksAudioController(element){
  var resetAudioOnPlay, 
      pauseReadAloud;

  this.el = element;
  this.el.addEventListener(iBooks.START_EVENT, this, false);
  this.src = this.el.getAttribute(iBooks.MEDIA_AUDIO_SOURCE_ATTRIBUTE);
  
  resetAudioOnPlay = this.el.getAttribute(iBooks.MEDIA_AUDIO_RESET_ATTRIBUTE);
  this.resetAudioOnPlay = (resetAudioOnPlay == undefined || resetAudioOnPlay == "false") ? false : true;

  pauseReadAloud = this.el.getAttribute(iBooks.MEDIA_PAUSE_READ_ALOUD_ATTRIBUTE);
  this.pauseReadAloud = (pauseReadAloud == undefined || pauseReadAloud == "false") ? false : true;
};

/**
 *  Creates a new audio element, set the source, then load it.
 */
iBooksAudioController.prototype.setAudio = function(){
  this.media = new Audio();
  this.media.src = this.src;
  
  if(this.pauseReadAloud){
    this.media.setAttributeNS("http://apple.com/ibooks/html-extensions", "pause-readaloud", true);
  };
  
  document.documentElement.appendChild(this.media);
};

/**
 *  Plays the audio source, if <code>iBooks.MEDIA_PLAYING_CSS_CLASS</code>
 *  is <code>true</code> reset the audio track.
 *  
 *  Additionally, adds <code>iBooks.MEDIA_PLAYING_CSS_CLASS</code> to the body.
 */
iBooksAudioController.prototype.play = function(){  
  document.body.addClassName(iBooks.MEDIA_PLAYING_CSS_CLASS);

  if(this.resetAudioOnPlay && this.media.currentTime != 0){
    this.media.currentTime = 0;
  }
  
  this.media.play();
};

/**
 *  Pauses the audio source. Additionally, removes 
 *  <code>iBooks.MEDIA_PLAYING_CSS_CLASS</code> from the body.
 */
iBooksAudioController.prototype.pause = function(){
  document.body.removeClassName(iBooks.MEDIA_PLAYING_CSS_CLASS);
  this.media.pause();
};

/**
 *  Toggles between play and pause.
 */
iBooksAudioController.prototype.togglePlayPause = function(){
  if(this.media == undefined){ this.setAudio() }
  this.media.paused ? this.play() : this.pause();
};

/**
 *  On touch start, add an event listener for touch end. Store the
 *  touch start X, Y coordinates for later use.
 *
 *  @property {Object} event The required event object
 */
iBooksAudioController.prototype.touchStart = function(event){
  this.startX = iBooks.Utils.eventCanonicalX(event);
  this.startY = iBooks.Utils.eventCanonicalY(event);

  window.addEventListener(iBooks.END_EVENT, this, false);
};

/**
 *  On touch end, remove our event listeners. Determine if the user action was a 
 *  tap, or gesture; if the action was a tap then add <code>iBooks.ACTIVE_CSS_CLASS</code>
 *  to the body class and prevent default. Otherwise, allow iBooks to handle the event.
 * 
 *  @property {Object} event The required event object
 */
iBooksAudioController.prototype.touchEnd = function(event){
  window.removeEventListener(iBooks.END_EVENT, this, false);
                                                                           
  this.xTap = Math.abs(this.startX - iBooks.Utils.eventCanonicalX(event)) < iBooks.TAP_THRESHOLD ;
  this.yTap = Math.abs(this.startY - iBooks.Utils.eventCanonicalY(event)) < iBooks.TAP_THRESHOLD ;
                                                                           
  if (this.xTap && this.yTap){
    event.preventDefault();
    this.togglePlayPause();
  };
};


/**
 *  Event triage.
 */
iBooksAudioController.prototype.handleEvent = function(event){
  switch(event.type){
    case iBooks.START_EVENT:
      this.touchStart(event);
      break;
    case iBooks.END_EVENT:
      this.touchEnd(event);
      break;
  }
};

/* ==================== DRAGGABLES ==================== */

/**
 * Draggables controller interates through all elements with 
 * CSS class name <code>iBooks.DRAGGABLE_CSS_SELECTOR</code>. 
 *
 * Once found, a <code>iBooksDraggableController</code> is instantiated 
 * for each element.
 */
function iBooksDraggablesBaseController(){
  var draggableElements = document.querySelectorAll(iBooks.DRAGGABLE_CSS_SELECTOR),
      draggableElementsLength = draggableElements.length;

  for (var i = draggableElementsLength - 1; i >= 0; i--){
    new iBooksDraggableController(draggableElements[i]);
  };
};

/**
 *  This is called when we've found a draggable HTML element.
 *
 *  @property {Object} element The required object to instantiate the <code>iBooksDraggableController</code>.
 */
function iBooksDraggableController(element){
  var page,
      pageComputedStyle,
      elementComputedStyle;

  page = document.querySelector(iBooks.PAGE_CSS_SELECTOR);
  pageComputedStyle = window.getComputedStyle(page);
  elementComputedStyle = window.getComputedStyle(element);
  
  this.el = element;
  this.el.addEventListener(iBooks.START_EVENT, this, false);

  this.draggable = false;
  this.deltaX = 0;
  this.deltaY = 0;
    
  this.draggableHeight = parseInt(pageComputedStyle.height);
  this.draggableWidth = parseInt(pageComputedStyle.width);

  this.el.style.cursor="pointer";
};

/**
 *  Called on <code>iBooks.START_EVENT</code>. 
 *  Appends <code>iBooks.ELEMENT_DRAGGING_CLASS</code> to the body on drag start.
 */
iBooksDraggableController.prototype.dragStart = function(event){
  event.preventDefault();
  
  document.body.addClassName(iBooks.ELEMENT_DRAGGING_CLASS);
      
  // make our starting point be the location we tapped minus the existing drag delta
  // this ensures the point within the dragged element at which we started the interaction
  // remains under the finger at all times
  this.startX = iBooks.Utils.eventCanonicalX(event) - this.deltaX;
  this.startY = iBooks.Utils.eventCanonicalY(event) - this.deltaY;

  window.addEventListener(iBooks.MOVE_EVENT, this, true);
  window.addEventListener(iBooks.END_EVENT, this, true);
};

/**
 *  Called on <code>iBooks.MOVE_EVENT</code>. 
 *  Calculates the translation of the draggable element.
 */
iBooksDraggableController.prototype.dragMove = function(event){
  event.preventDefault();
  
  var translate,
      e;

  this.parseAxialData(event, "x", this.draggableWidth);
  this.parseAxialData(event, "y", this.draggableHeight);
  
  translate = iBooks.Utils.t3d(this.deltaX, this.deltaY, 0);
  this.el.style.webkitTransform = translate;
};

/**
 *  Called on <code>iBooks.END_EVENT</code>.
 *  Removes event listeners and removes <code>iBooks.ELEMENT_DRAGGING_CLASS</code> 
 *  from the body.
 */
iBooksDraggableController.prototype.dragStop = function(){
  event.preventDefault();
  
  document.body.removeClassName(iBooks.ELEMENT_DRAGGING_CLASS);
  window.removeEventListener(iBooks.MOVE_EVENT, this, true);
  window.removeEventListener(iBooks.END_EVENT, this, true);
};

/**
 *  Parses client X and Y coordinates. 
 *  Verifies client coordinates are within valid X and Y boundaries.
 */
iBooksDraggableController.prototype.parseAxialData = function(event, axis, targetBoundary){
  var invalidBoundary;
      
  axis = axis.toUpperCase();
  
  var coordinate = iBooks.Utils["eventCanonical"+axis](event);
  invalidBoundary = (coordinate < 0 || coordinate > targetBoundary);
  
  if(invalidBoundary){
    if(coordinate < 0) { this["delta"+axis] = -(this["start"+axis]); }
    if(coordinate > targetBoundary) { this["delta"+axis] = targetBoundary - this["start"+axis]; }
  }
  else { 
    this["delta"+axis] = coordinate - this["start"+axis];
  }
  
};

/**
 *  Event triage.
 */
iBooksDraggableController.prototype.handleEvent = function(event){
  switch(event.type){
    case iBooks.START_EVENT:
      this.dragStart(event);
      break;
    case iBooks.MOVE_EVENT:
      this.dragMove(event);
      break;
    case iBooks.END_EVENT:
      this.dragStop();
      break;
  }
};

/* ==================== STAMPABLES CONTROLLER ==================== */

/**
 * Stampables controller interates through all elements with 
 * CSS class name <code>iBooks.STAMPABLE_CSS_SELECTOR</code>. 
 *
 * Once found, a <code>iBooksStampableController</code> is instantiated 
 * for each element.
 */
function iBooksStampablesBaseController(){
  var stampableElements = document.querySelectorAll(iBooks.STAMPABLE_CSS_SELECTOR),
      stampableElementsLength = stampableElements.length;
  
  for (var i = stampableElementsLength - 1; i >= 0; i--){
    new iBooksStampableController(stampableElements[i]);
  };
  
};

/**
 *  This is called when we've found a stampable HTML element.
 *
 *  @property {Object} element The required object to instantiate the <code>iBooksStampableController</code>.
 */
function iBooksStampableController(element){
  this.el = element;
  this.hitarea = this.el.querySelector("svg path");
  this.hitarea.addEventListener(iBooks.START_EVENT, this, false);
  this.hitarea.style.cursor="pointer";
};


/**
 *  Clones the target element.
 */
iBooksStampableController.prototype.stamp = function(event){
  var stampedElement;
  
  stampedElement = document.createElement("div");
  stampedElement.addClassName(iBooks.STAMPED_ELEMENT_CSS_CLASS);
  stampedElement.style.left = iBooks.Utils.eventCanonicalX(event) + "px";
  stampedElement.style.top = iBooks.Utils.eventCanonicalY(event) + "px";

  this.el.appendChild(stampedElement);
};

/**
 *  Event triage.
 */
iBooksStampableController.prototype.handleEvent = function(event){
  if (event.type === iBooks.START_EVENT){
    event.preventDefault();
    this.stamp(event);
  }
};

/* ==================== TOGGLEABLES CONTROLLER ==================== */

/**
 * Toggleables controller interates through all elements with 
 * CSS class name <code>iBooks.TOGGLEABLE_CSS_SELECTOR</code>. 
 *
 * Once found, a <code>iBooksToggleableController</code> is instantiated 
 * for each element.
 *
 * User defined class name on toggle set using the HTML <code>data-toggled-class-name</code> attribute.
 */
function iBooksToggleablesBaseController(element){
  var toggleableElements = document.querySelectorAll(iBooks.TOGGLEABLE_CSS_SELECTOR),
      toggleableElementsLength = toggleableElements.length;
  
  for (var i=0; i < toggleableElementsLength; i++) {
    new iBooksToggleableController(toggleableElements[i]);
  };
  
};

/**
 *  This is called when we've found a toggleable HTML element.
 *
 *  @property {Object} element The required object to instantiate the <code>iBooksToggleableController</code>.
 */
function iBooksToggleableController(element){
  var toggledClassName = element.getAttribute("data-toggled-class-name");
  
  this.el = element;
  this.el.addEventListener(iBooks.START_EVENT, this, false);
  
  this.toggledClassName = (toggledClassName === null) ? iBooks.ACTIVE_CSS_CLASS : toggledClassName;

  this.el.style.cursor="pointer";
};

/**
 *  On touch start, add an event listener for touch end. Store the
 *  touch start X, Y coordinates for later use.
 *
 *  @property {Object} event The required event object
 */
iBooksToggleableController.prototype.touchStart = function(event){
  this.startX = iBooks.Utils.eventCanonicalX(event);
  this.startY = iBooks.Utils.eventCanonicalY(event);

  window.addEventListener(iBooks.END_EVENT, this, false);
};

/**
 *  On touch end, remove our event listeners. Determine if the user action was a 
 *  tap, or gesture; if the action was a tap then add <code>iBooks.ACTIVE_CSS_CLASS</code>
 *  to the body class and prevent default. Otherwise, allow iBooks to handle the event.
 * 
 *  @property {Object} event The required event object
 */
iBooksToggleableController.prototype.touchEnd = function(event){
  window.removeEventListener(iBooks.END_EVENT, this, false);
                                                                           
  this.xTap = Math.abs(this.startX - iBooks.Utils.eventCanonicalX(event)) < iBooks.TAP_THRESHOLD ;
  this.yTap = Math.abs(this.startY - iBooks.Utils.eventCanonicalY(event)) < iBooks.TAP_THRESHOLD ;

  if (this.xTap && this.yTap){
    event.preventDefault();
    this.el.toggleClassName(this.toggledClassName);
  };
};


/**
 *  Event triage.
 *
 */
iBooksToggleableController.prototype.handleEvent = function(event){
  switch(event.type){
    case iBooks.START_EVENT:
      this.touchStart(event);
      break;
    case iBooks.END_EVENT:
      this.touchEnd(event);
      break;
  }
};

