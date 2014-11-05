/**
 *
 * @author   Santiago Ramirez
 * @modified 11/2/2014 4:18 PM
 *
 * @desc Single transaction class.
 *
 */

singleTransaction = function( transactionObj )
{
	// Extract property values from given object
	for ( var property in transactionObj )
		this[property] = transactionObj[property];

	singleTransaction.prototype.findNextID = function()
	{
		/**
		 *
		 * @author   Santiago Ramirez
		 * @modified 10/26/2014 4:35 PM
		 *
		 * @desc Loop through all transactions to extract and array of IDs.
		 * These IDs are then sorted in numeric descending order to return the
		 * next ID.
		 *
		 */
		
		this.transactionIDs = new Array();
		
		if ( !this.transactions )
			this.transactions = getObj('transactions');		
				
		if ( this.transactions.length > 0 )
		{
			for ( var i = 0; i < this.transactions.length; i++ ) {
				this.transactionIDs.push( this.transactions[i].id );
			}

			this.transactionIDs.sort( function(a, b){return b-a} );
			return parseInt( this.transactionIDs[0] ) + 1;
		}
		
		else return 0;
	}

	singleTransaction.prototype.goToTransaction = function()
	{
		/**
		 *
		 * @author Santiago Ramirez
		 * @modified 10/28/2014 4:45 PM
		 *
		 * @desc Triggered by a DOM event.
		 * @desc Navigates the user to the single-transaction.html page where the
		 * data stored in the tmpTransaction field is placed into the form to be
		 * edited.
		 *
		 */
	
		this.transactions = getObj( 'transactions' );
		
		for ( var i = 0; i < this.transactions.length; i++ )
		{
			if ( this.transactions[i].id == this.id )
			{
				setObj( 'tmpTransaction', this.transactions[i] );
				window.location = 'single-transaction.html'; 
			}
		}
	}

	singleTransaction.prototype.getIndexFromID = function()
	{
		/**
		 *
		 * @author   Santiago Ramirez
		 * @modified 11/2/2014 4:13 PM
		 *
		 * @desc Loop through all transactions to find the index of the current id
		 *
		 */
			 
		for ( var i = 0; i < this.transactions.length; i++ )
			if ( parseInt( this.transactions[i].id ) === parseInt( this.id ) )
				return this.index = i;
	}

	singleTransaction.prototype.removeTransaction = function()
	{
		/**
		 *
		 * @author   Santiago Ramirez
		 * @modified 10/26/2014 4:15 PM
		 *
		 * @desc Delete a transaction from the localStorage.
		 *
		 */
		 
		this.transactions = getObj('transactions');
		this.getIndexFromID();
		
		this.transactions.splice( this.index, 1 );
		setObj( 'transactions', this.transactions );
		
		window.location = '';
	}
	
	singleTransaction.prototype.saveTransaction = function()
	{
		/**
		 *
		 * @author   Santiago Ramirez
		 * @modified 11/2/2014 4:16PM
		 *
		 * @desc Save a new transaction or update an existing one.
		 *
		 */

		// Create transactions in storage if not already there
		if ( !localStorage.transactions )
			setObj( 'transactions', new Array() );
		
		var form   = document.forms['transaction'];
		var formID = form.getAttribute('data-id');
		
		this.transactions = getObj('transactions');
		
		// Save data from form
		this.t = new Object();
		this.t.id           = ( formID === 'false' ) ? this.findNextID() : formID;	
		this.t.freq         = parseInt( form.freq.value );
		this.t.amount       = form.amount.value.toFloat();
		this.t.amountAnnual = this.t.amount * this.t.freq;	
		this.t.tax          = form.tax.value;
		this.t.title        = form.title.value;	
		this.t.type         = form.type.value;
		
		this.id = this.t.id;
		
		// If this is an existing transaction
		if ( formID !== 'false' )
		{
			this.index = this.getIndexFromID();
			this.transactions[this.index] = this.t;
		}
		
		// New transaction
		else 
			this.transactions.push( this.t );
		
		setObj( 'transactions', this.transactions );
		window.location = 'overview.html';
		return false;
	}
	
	singleTransaction.prototype.assignEventHandlers = function( editElem, deleteElem )
	{
		/**
		 *
		 * @author   Santiago Ramirez
		 * @modified 11/2/2014 4:16PM
		 *
		 * @desc Add onclick events to the .transaction-edit and .transaction-delete
		 * buttons.
		 *
		 */
		
		editElem.onclick   = this.goToTransaction.bind( this );
		deleteElem.onclick = this.removeTransaction.bind( this );
	}
}