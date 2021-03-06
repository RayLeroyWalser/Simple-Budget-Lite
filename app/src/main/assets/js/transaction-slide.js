/**
 *
 * @author Santiago Ramirez
 * @modified 11/2/2014 11:59 AM
 *
 * @desc Creates a single transaction slide for the overview.html page.
 *
 */

function transactionSlide( transaction )
{
	this.transaction    = new singleTransaction( transaction );
	this.budgetingFreq  = settings.budgetingFreq.value;
	this.currencySymbol = settings.currencySymbol;
	this.amountText     = ( this.transaction.amountAnnual / this.budgetingFreq ).currencyFormat( this.currencySymbol );

	transactionSlide.prototype.appendElements = function()
	{
		/**
		 *
		 * @author Santiago Ramirez
		 * @modified 11/1/2014 9:24 PM
		 *
		 * @desc Append HTML elements together.
		 *
		 */
		 
		this.element.menu.appendChild( this.element.buttonEdit );
		this.element.menu.appendChild( this.element.buttonDelete );	
		this.element.content.appendChild( this.element.title );
		this.element.content.appendChild( this.element.amount );
		this.element.container.appendChild( this.element.content );		
		this.element.container.appendChild( this.element.menu );
	}
	
	transactionSlide.prototype.assignEventHandlers = function()
	{	
		/**
		 *
		 * @author Santiago Ramirez
		 * @modified 11/2/2014 12:01 PM
		 *
		 * @desc Assign edit / delete onclick events.
		 *
		 */
		
	}
	
	transactionSlide.prototype.setAttributes = function()
	{
		/**
		 *
		 * @author Santiago Ramirez
		 * @modified 11/2/2014 12:03 PM
		 *
		 * @desc Set identifying attributes to each transaction element.
		 *
		 */

		this.element.container.className    = 'transaction-container transaction-' + this.transaction.type;
		this.element.content.className      = 'transaction-content';
		this.element.title.className        = 'transaction-title';
		this.element.amount.className       = 'transaction-amount';
		this.element.menu.className         = 'transaction-menu';
		this.element.buttonEdit.className   = 'transaction-edit';
		this.element.buttonDelete.className = 'transaction-delete';
		
		this.element.container.setAttribute( 'id', 'transaction-container-' + this.transaction.id );
		this.element.content.setAttribute( 'id', 'transaction-content-' + this.transaction.id );
		this.element.menu.setAttribute( 'id', 'transaction-menu-' + this.transaction.id );
		this.element.content.setAttribute( 'data-id', this.transaction.id );
		this.element.buttonEdit.setAttribute( 'data-id', this.transaction.id );
		this.element.buttonDelete.setAttribute( 'data-id', this.transaction.id );	
	}
	
	transactionSlide.prototype.setInnerHTML = function()
	{
		/**
		 *
		 * @author Santiago Ramirez
		 * @modified 11/2/2014 12:05 PM
		 *
		 * @desc Set the innerHTML of various elements.
		 *
		 */

		this.element.title.innerHTML        = this.transaction.title;
		this.element.buttonEdit.innerHTML   = 'Edit';
		this.element.buttonDelete.innerHTML = 'Delete';

		switch ( this.transaction.type )
		{
			case 'expenses' :
				this.element.amount.innerHTML   = '&minus; ' + this.amountText;				
				break;
			
			case 'income' :
				this.element.amount.innerHTML   = '+ ' + this.amountText;
				break;
			
			case 'savings' :
				this.element.amount.innerHTML   = '<em>' + this.amountText + ' Reserved</em>';
				break;
		}
	}
	
	transactionSlide.prototype.createHTMLElements = function()
	{
		/**
		 *
		 * @author Santiago Ramirez
		 * @modified 11/2/2014 12:05 PM
		 *
		 * @desc Initially create all HTML elements.
		 *
		 */

		this.element = new Object();
		
		this.element.container    = document.createElement( 'div' );
		this.element.content      = document.createElement( 'div' );
		this.element.title        = document.createElement( 'div' );
		this.element.amount       = document.createElement( 'div' );
		this.element.menu         = document.createElement( 'div' );
		this.element.buttonDelete = document.createElement( 'div' );
		this.element.buttonEdit   = document.createElement( 'div' );
	}

	// Call the functions to create the transaction element and return it.
	this.createHTMLElements();
	this.setAttributes();
	this.setInnerHTML();
	this.appendElements();
	
	this.transaction.assignEventHandlers( this.element.buttonEdit, this.element.buttonDelete );
	this.element.container.onclick = toggleTransaction;
	
	return this.element.container;
}