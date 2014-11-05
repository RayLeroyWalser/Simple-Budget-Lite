/**
 *
 * @author Santiago Ramirez
 * @modified 11/2/2014 12:14 PM
 *
 * @desc Handles an array of functions related to multiple transactions.
 *
 */

transactions = function()
{
	this.availableIncome;
	this.transactions = getObj( 'transactions' );
	this.types        = new Array( 'expenses', 'income', 'savings' );
	
	this.percents = new Object();
	this.percents.available;
	this.percents.expenses;
	this.percents.savings;

	this.totals = new Object();
	this.totals.expenses = 0;
	this.totals.income   = 0;
	this.totals.savings  = 0;

	transactions.prototype.calcPercents = function()
	{
		/**
		 *
		 * @author Santiago Ramirez
		 * @modified 10/31/2014 4:08 PM
		 *
		 * @desc Calculate percentages of each transaction type.
		 *
		 */
	
		if ( this.availableIncome <= 0 && this.totals.expenses > 0 )
			this.percents.expenses = 100;
		
		else {
			this.percents.expenses  = ( this.totals.expenses / this.totals.income ) * 100;
			this.percents.savings   = ( this.totals.savings / this.totals.income ) * 100;
			this.percents.available = 100 - ( this.percents.expenses + this.percents.savings );
		}
		
	}

	transactions.prototype.calcTotals = function()
	{
		/**
		 *
		 * @author Santiago Ramirez
		 * @modified 10/31/2014 4:10 PM
		 *
		 * @desc Calculate total amount of a each transaction type (expenses, income
		 *  and savings).
		 *
		 */

		this.fetchTypes();
		
		for ( var i = 0, total = 0, type = this.types[i]; i < this.types.length; i++, total = 0, type = this.types[i] )
		{
			for ( var j = 0, t = this[type][j]; j < this[type].length; j++, t = this[type][j] )
			{
				if ( t.tax === 'true' )
					t.amountAnnual = t.amountAnnual + ( t.amountAnnual * settings.taxAmount );

				total = total + ( t.amountAnnual / settings.budgetingFreq.value );
			}
			
			this.totals[type] = total;
		}

		this.availableIncome = this.totals.income - this.totals.expenses - this.totals.savings;
	}
		
	transactions.prototype.fetchTypes = function()
	{
		/**
		 *
		 * @author Santiago Ramirez
		 * @modified 11/2/2014 12:11 PM
		 *
		 * @desc Retreives the an array for each transaction type (ex. this.income,
		 * this.expenses, this.savings)
		 *
		 */
		 
		if ( !this.transactions )
			this.transactions = getObj('transactions');

		for ( var i = 0, type = this.types[i]; i < this.types.length; i++, type = this.types[i] )
		{
			this[type] = new Array();
			
			if ( this.transactions ){
				for ( var j = 0, t = this.transactions[j]; j < this.transactions.length; j++, t = this.transactions[j] )
				{
					if ( t.type === type )
						this[type].push( t );
				}
			}
		}
	}
}
