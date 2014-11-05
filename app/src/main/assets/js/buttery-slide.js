/**
 *
 * @author Santiago Ramirez
 * @modified 11/2/2014 10:59 AM
 *
 * @desc Want to add a spice of mobile functionality without JQuery?
 * butterySlide is a lightweight function to give any HTML element a
 * buttery smooth dragging effect.
 *
 * @note This function will work best if there are no text elements in the
 * trigger <div> element.
 *
 * @param DOM object trigger  : Object to trigger dragItem; this may or may not be the same as the dragItem  .  
 * @param DOM object dragItem : Object to be moved.
 *
 * @params array params
 * @param int maxDrag         : Point at which to end dragging.
 * @param int minDrag         : Point at which to end drag opposing way; this is usually 0.
 * @param int restPosition    : Initial position of dragItem.
 * @param string position     : Top, right, bottom or left.
 * @param int transition      : Amount of seconds to ease slider after reaching this.closeEnough
 *
 */

butterySlide = function( trigger, dragItem, params )
{
	this.dragBegin    = null;
	this.dragItem     = dragItem;
	this.dragOffset   = null;
	this.maxDrag      = params['maxDrag'];
	this.minDrag      = params['minDrag'] || 0;
	this.position     = params['position'];
	this.restPosition = params['restPosition'] || 0;
	this.transition   = ( params['transition'] || 0 ) + 's all ease';
	this.trigger      = trigger;
	
	// Point in which drag item snaps to place
	this.closeEnough = ( this.maxDrag / 2 ); 
		
	butterySlide.prototype.initDrag = function( e )
	{
		/**
		 *
		 * @author Santiago Ramirez
		 * @modified 11/2/2014 11:29 AM
		 *
		 * @desc Initiates a new drag and defines the resting position of
		 * this.dragItembefore initiating the onmousemove event this.dragSlider
		 * which will move this.dragItem from the rest position.
		 */
		
		this.removeTransition();
		
		this.dragBegin    = e.touches[0].pageX;
		this.restPosition = parseInt( this.dragItem.style.right );
		
		this.trigger.ontouchmove = this.dragSlider.bind( this );
	}

	butterySlide.prototype.dragSlider = function(e)
	{
		/**
		 *
		 * @author Santiago Ramirez
		 * @modified 11/2/2014 11:23 AM
		 *
		 * @desc Triggered every time a user moves their mouse over this.trigger.
		 * It determines the position of the dragItem.
		 *
		 */
		
		e.preventDefault();
		 
		this.currentPosition = e.touches[0].pageX;
		
		this.dragOffset = this.dragBegin - this.currentPosition;
		
		
		cd = parseInt( this.dragItem.style[this.position] );
		
		if ( cd < this.maxDrag && cd > this.minDrag )	
			this.moveDragItems( this.restPosition + this.dragOffset );

		if ( this.dragOffset > this.minDrag && this.dragOffset > this.closeEnough )
		{
			this.addTransition();
			this.moveDragItems( this.maxDrag );
			this.trigger.ontouchmove = null;
		}
		
		else if ( this.dragOffset < this.minDrag && this.dragOffset < -this.closeEnough )
		{
			this.addTransition();
			this.moveDragItems( this.minDrag );
			this.trigger.ontouchmove = null;
		}
	}
	
	butterySlide.prototype.moveDragItems = function( position )
	{
		/**
		 *
		 * @author Santiago Ramirez
		 * @modified 11/2/2014 11:25 AM
		 *
		 * @desc Updates the position of this.dragItem.
		 *
		 */
		 
		return this.dragItem.style[this.position] = position + 'px';
	}
	
	butterySlide.prototype.addTransition = function()
	{
		/**
		 *
		 * @author Santiago Ramirez
		 * @modified 11/2/2014 12:05 PM
		 *
		 * @desc Add easing transition.
		 *
		 */

		this.dragItem.style.transition       = this.transition;
		this.dragItem.style.webkitTransition = this.transition;
		this.dragItem.style.mozTransition    = this.transition;
		
	}
	
	butterySlide.prototype.removeTransition = function()
	{
		/**
		 *
		 * @author Santiago Ramirez
		 * @modified 11/2/2014 4:05 PM
		 *
		 * @desc Remove easing transition
		 *
		 */
		 
		this.dragItem.style.transition       = '';
		this.dragItem.style.webkitTransition = '';
		this.dragItem.style.mozTransition    = '';
	}
	
	// Initiate drag on mouse down of trigger element
	this.trigger.ontouchstart = this.initDrag.bind( this );
	
	// Default the position of the the dragItem
	this.dragItem.style[this.position] = this.restPosition;
}