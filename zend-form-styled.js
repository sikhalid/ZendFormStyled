/**
 * Universal Zend_Form styling
 * Javascript fixes, jquery required!
 * Here is everything needed for proper Zend_Form rendering that I couldn't achieve in CSS...
 * @author Wojtek Iskra wojtek@domeq.net
 * @version 1.0, 2011-03-19
 */

$(document).ready(function() {
    /**
     * First we check what kind of Zend_Form we're dealing with...
     * It can either be:
     * - Zend_Form with Zend_Form_Elements in it ('elementsOnly' class added),
     * - Zend_Form with Zend_Form_Subform(s), Zend_Form_Elements in it,
     *   but all elements are groupped in DisplayGroups ('allInDisplayGroups' class added),
     * - Zend_Form with Zend_Form_Subform(s) and Zend_Form_Elements in it, can also contain DisplayGroups
     *   ('subformAndDisplayGroups' class added).
     * We add classes to each form.
     * If you want to force certain type of styling despite form contents,
     * set one of the classes in Zend_Form, it will override jquery.
     */
    $('form').each(function(index, element) {
        if (!$(element).hasClass('allInDisplayGroups') && 
            !$(element).hasClass('subformAndDisplayGroups') && 
            !$(element).hasClass('elementsOnly')
           ) {
            if ($('fieldset fieldset', $(element)).length > 0) {
                $(element).addClass('allInDisplayGroups');
            }
            else if ($('dl.zend_form>dd>fieldset>dl>dd>fieldset', $(element)).length > 0) {
                $(element).addClass('subformAndDisplayGroups');
            }
            else if ($('dl.zend_form>dd>fieldset>dl>dd>input', $(element)).length > 0) {
                $(element).addClass('subformsOnly');
            }
            else {
                $(element).addClass('elementsOnly');
            }
        }
    });

    /**
     * Hiding empty dt elements rendered by Zend_Form only for validation purposes.
     */
    $('form dt').each(function(index, element) {
        if($(element).html() == '&nbsp;') {
            $(element).hide();
        }
    });
    
    /**
     * Equalizing boxes heights in each row (for twoColumns layout).
     */
    $('form.twoColumns.subformsOnly dl.zend_form>dd:even').each(function(index, element) {
        var height = 0;
            if($(element).children('fieldset').height() < $(element).next().next().children('fieldset').height())
                $(element).children('fieldset').css('height', $(element).next().next().children('fieldset').height());
            else if($(element).children('fieldset').height() > $(element).next().next().children('fieldset').height())
                $(element).next().next().children('fieldset').css('height', $(element).children('fieldset').height());
    });

    $('form.twoColumns dl.zend_form>dd>fieldset').each(function(index, subform) {
        var height = 0;
        $('dl>dd:even', $(subform)).each(function(index, element) {
            if($(element).children('fieldset').height() < $(element).next().next().children('fieldset').height())
                $(element).children('fieldset').css('height', $(element).next().next().children('fieldset').height());
            else if($(element).children('fieldset').height() > $(element).next().next().children('fieldset').height())
                $(element).next().next().children('fieldset').css('height', $(element).children('fieldset').height());
        });
    });
    
    /**
     * Adding 'error' class to form element which did not pass validation.
     * (standard Zend_Form decorators do not do that...)
     */
    $('ul.errors').each(function(index, element) {
        $(element).prev().addClass('error');
      });
    
    /**
     * Removing 'error' class after leaving the element (not sure if it's reasonable though...)
     */
    $('.error').bind('blur', function() {
          $(this).removeClass('error');
    });
    
    /**
     * Adding 'submit' class to button's container
     */
    $('input[type=submit]').parent().addClass('submit-container');
});