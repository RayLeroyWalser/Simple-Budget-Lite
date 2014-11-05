this.getItem = function( key ) {
	return localStorage.getItem( key );
}

this.getObj = function( key ) {
	return JSON.parse( localStorage.getItem( key ) );
}

this.setItem = function( key, value ) {
	return localStorage.setItem( key, value );
}

this.setObj = function( key, obj ) {
	return localStorage.setItem( key, JSON.stringify( obj ) );
}

	function toggleTransaction()
	{
		/**
		 *
		 * @author Santiago Ramirez
		 * @modified 10/30/2014 3:29 PM
		 *
		 * @desc Initially hide all menus being displlayed; even if there are
		 * none being displayed.
		 *
		 * @desc Display or hide the current element that has been triggered by the event
		 *
		 */
		 
		var id = this.id.replace('transaction-container-', '');
		var contentElem  = document.getElementById( 'transaction-content-' + id );
		var menuElem     = document.getElementById( 'transaction-menu-' + id );
		var toggleStatus = ( contentElem.style.left != '-50%' ) ? true : false;
		
		var allContentElems = document.getElementsByClassName( 'transaction-content' );
		var allMenuElems    = document.getElementsByClassName( 'transaction-menu' );
		
		// Hide all elements
		for ( var i =0; i < allContentElems.length; i++ ){
			allContentElems[i].style.left = '0';
			allMenuElems[i].style.right   = '-50%';
		}
		
		// Display or hide current element
		if ( toggleStatus === true ) {
			contentElem.style.left = '-50%';
			menuElem.style.right   = '0';
		}
		
		else {
			contentElem.style.left = '0';
			menuElem.style.right   = '-50%';
		}
    }


	
	

















function sortByProperty( property )
{
    var sortOrder = 1;
	
    if ( property[0] === '-' ) {
        sortOrder = -1;
        property = property.substr(1);
    }
	
    return function ( a, b )
	{
        var result = ( a[property] < b[property] ) ? -1 : ( a[property] > b[property] ) ? 1 : 0;
        return result * sortOrder;
    }
}	





String.prototype.toFloat = function()
{
	var regexFloat = /[^0-9\.]+/g;

	this.number = this;
	this.number = this.number.replace( regexFloat, '' );
	this.number = ( Math.round( this.number * 100) / 100).toFixed(2);	

	return this.number;	
}

Number.prototype.currencyFormat = function( symbol )
{
	this.number = parseFloat( this ).toFixed(2);
	
	while ( /(\d+)(\d{3})/.test( this.number.toString() ) ) {
		this.number = this.number.toString().replace( /(\d+)(\d{3})/, '$1'+','+'$2' );
    }
	
	return symbol + this.number;
}

