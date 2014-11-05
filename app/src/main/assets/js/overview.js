/**
 *
 * @author Santiago Ramirez
 * @modifed 11/2/2014 11:53 AM
 *
 * @desc Creates the content of the overview.html page.
 *
 */

Overview = function()
{	
	this.elem = new Object();
	
	this.elem.availBalance = new Object();
	this.elem.percentBar   = new Object();
	this.elem.totalText    = new Object();

	this.elem.availBalance.amount  = document.getElementById( 'available-balance-amount' );
	this.elem.availBalance.text    = document.getElementById( 'available-balance-text' );
	this.elem.budgetFreq           = document.getElementById( 'budgeting-freq' );
	this.elem.percentBar.available = document.getElementById( 'percentage-available' );
	this.elem.percentBar.expenses  = document.getElementById( 'percentage-expenses' );
	this.elem.percentBar.savings   = document.getElementById( 'percentage-savings' );	
	this.elem.totalText.income     = document.getElementById( 'total-income-text' );
	this.elem.totalText.expenses   = document.getElementById( 'total-expenses-text' );
	this.elem.totalText.savings    = document.getElementById( 'total-savings-text' );
	
	Overview.prototype.createTransactionElements = function()
	{
		/**
		 *
		 * @author Santiago Ramirez
		 * @modified 11/1/2014 8:45 PM
		 *
		 * @desc Create all the transaction containers and their elements.
		 *
		 */

		var types = transactions.types;

		for ( var i = 0, type = types[i]; i < types.length; i++, type = types[i])
		{
			this.elem.container = document.getElementById( 'transactions-' + type );
			transactions[type].sort( sortByProperty( settings.sortOrder ) );
			
			for ( var j = 0; j < transactions[type].length; j++ )
			{
				var transaction     = transactions[type][j];
				var transactionItem = new transactionSlide( transaction );
				
				this.elem.container.appendChild( transactionItem );
				
				// Enable butterySlide to view transaction-menu.
				/*
				
				var params = new Array();
				
				params['maxDrag']    = trigger.offsetWidth / 2;
				params['position']   = 'right';
				params['transition'] = 0.3;
				
				var slider  = new butterySlide( trigger, trigger, params );
				*/
			}
		}
	}

	Overview.prototype.setInnerHTMLOfTotals = function()
	{
		/**
		 *
		 * @author Santiago Ramirez
		 * @modified 10/31/2014 4:07 PM
		 *
		 * @desc Set the inner text / values of HTML on the overview.html page.
		 *
		 */
		 
		this.symbol = settings.currencySymbol;
		
		this.elem.availBalance.amount.innerHTML = transactions.availableIncome.currencyFormat( this.symbol );
		this.elem.availBalance.text.innerHTML   = 'Available to spend <span class="lower-case">' + settings.budgetingFreq.string + '</span>';
		
		this.elem.totalText.income.innerHTML    = transactions.availableIncome.currencyFormat( this.symbol );
		this.elem.totalText.expenses.innerHTML  = transactions.totals.expenses.currencyFormat( this.symbol );
		this.elem.totalText.savings.innerHTML   = transactions.totals.savings.currencyFormat( this.symbol );
	}
	
	Overview.prototype.setPercentageWidths = function()
	{
		/**
		 *
		 * @author Santiago Ramirez
		 * @modified 10/31/2014 4:07 PM
		 *
		 * @desc Set the widths of each individual percentage type within the
		 * #percentage HTML element.
		 *
		 */
		
		this.elem.percentBar.available.style.width = transactions.percents.available + '%';
		this.elem.percentBar.expenses.style.width  = transactions.percents.expenses + '%';
		this.elem.percentBar.savings.style.width   = transactions.percents.savings + '%';
	}
	
	this.createTransactionElements();
	this.setInnerHTMLOfTotals();
	this.setPercentageWidths();
	
	// Set the inner HTML of the #budgeting-freq element
	this.elem.budgetFreq.innerHTML = 'Budgeting ' + settings.budgetingFreq.string;
}

var settings     = new Settings();
var transactions = new transactions();

transactions.calcTotals();
transactions.calcPercents();

new Overview();