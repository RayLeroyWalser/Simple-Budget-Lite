/**
 *
 * @author Santiago Ramirez
 * @modified 11/1/2014 3:31 PM
 *
 * @desc Construct the Settings() class and define settings from the localStorage
 * object settings.
 *
 */

Settings = function()
{
	// Define user settings
	if ( localStorage.settings )
	{
		this.settings = getObj('settings');

		this.budgetingFreq  = this.settings.budgetingFreq;
		this.currencySymbol = this.settings.currencySymbol;
		this.sortOrder      = this.settings.sortOrder;
		this.taxAmount      = this.settings.taxAmount;
	}
	
	// Set defaults
	else this.setDefaults();
}

Settings.prototype.fillForm = function()
{
	/**
	 *
	 * @author Santiago Ramirez
	 * @modified 11/1/2014 3:31 PM
	 *
	 * @desc Fill in the form on the settings.html page.
	 *
	 */
	 
	this.form = document.forms['settings'];

	this.form.budgetingFreq.value  = this.budgetingFreq.value;
	this.form.currencySymbol.value = this.currencySymbol;
	this.form.sortOrder.value      = this.sortOrder;
	this.form.taxAmount.value      = this.taxAmount;
}

Settings.prototype.saveSettings = function()
{
	/**
	 *
	 * @author Santiago Ramirez
	 * @modified 11/1/2014 3:35 PM
	 *
	 * @desc Save settings from the form on the settings.html page.
	 *
	 */

	this.form = document.forms['settings'];
	
	this.budgetingFreq = new Object();
	this.budgetingFreq.value  = this.form.budgetingFreq.value;
	this.budgetingFreq.string = this.form.budgetingFreq[this.form.budgetingFreq.selectedIndex].innerHTML;
	
	this.currencySymbol = this.form.currencySymbol.value;
	this.sortOrder      = this.form.sortOrder.value;
	this.taxAmount      = this.form.taxAmount.value;
	
	delete this.form;
	setObj( 'settings', this );
	
	window.location = 'overview.html';
	return false;
}

Settings.prototype.setDefaults = function()
{
	/**
	 *
	 * @author Santiago Ramirez
	 * @modified 11/1/2014 3:31 PM
	 *
	 * @desc If there are no settings, set the defaults.
	 *
	 */

	this.budgetingFreq  = { value: 12, string : 'Monthly' };
	this.currencySymbol = '$';
	this.sortOrder      = 'title';
	this.taxAmount      = 0.07;
	
	setObj( 'settings', this );
}	