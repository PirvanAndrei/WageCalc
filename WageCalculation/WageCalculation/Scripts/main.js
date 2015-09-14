var target, table_container, table, settings_container, result_container;
var rowHtml = "<tr class='hours-row'>" +
              "<td class='col1'><div class='form-group'><input class='time-input form-control' type='text' class='form-control' placeholder='Example: 9:00' /></div></td>" +
              "<td class='col2'><div class='form-group'><input class='time-input form-control' type='text' class='form-control' placeholder='Example: 17:00' /></div></td>" +
              "<td class='col3'></td></tr>";


$(document).ready(function () {
    
    target = $('#target');

    table_container = $('#table-container');
    table;

    settings_container = $('#settings-container');

    result_container = $('#result-container');

    initTable();
    initSettings();
    initResults();



});


/**
 * Adds a table with header and body with a single row to the #table-container div.
 * The header contains the names of the first two columns, defined by varables col1 and col2.
 * Removes any content of the div before add the table.
 */
function initTable() {
    table_container.html("<table class='hours-table table table-hover table-condensed'>" +
                            "<thead><tr>" +
                                "<th class='column-1'>Start time</th>" +
                                "<th class='column-2'>End time</th>" +
                                "<th class='column-3'></th>" +
                            "</tr></thead>" +
                            "<tbody>" +
                                rowHtml +
                            "</tbody>" +
                         "</table>");

    table = $('.hours-table tbody');

    updateRows(table);
}

/**
 * Adds an empty row to the hours-table.
 * A row consists of 3 cells.
 * Cell 1 and 2 each contain an input field for the start/end times.
 * If the row is the first row in the table:
 *      Cell 3 contains only 1 button to add a new row below.
 * Else:
 *      Cell 3 contains 2 buttons; One to add a new row below, 
 *              and one to remove the row in which the button is located.  
 * 
 * If the row parameter is defined, the new row will be placed below it.
 * Otherwise, the new row is placed at the bottom of the table.
 * 
 */
function addRow(row) {
    $(row).after(rowHtml);
    updateRows(table);
}

function deleteRow(row) {
    $(table).find(row).remove();
    updateRows(table);
}

/**
 * Reassigns ids to hours-rows to make sure they stay
 * in the correct order after inserting a new row at a random position.
 * 
 * Reassigns buttons to row depending on their position
 * in the table. 
 * 
 */
function updateRows(table) {
    var rows = $(table).find('.hours-row');
    rows.each(function (index, row) {
        $(this).attr('id', index + 1);
        $(this).find('.col1 input').attr('tabindex', (index + 1) * 2 - 1);
        $(this).find('.col2 input').attr('tabindex', (index + 1) * 2);
        assignButtonsToRow(table, row);
    });
    // Update tabindices for wage, tax and calculate-btn
    $('#wage').attr('tabindex', rows.length * 2 + 1);
    $('#tax').attr('tabindex', rows.length * 2 + 2);
    $('.calculate-btn').attr('tabindex', rows.length * 2 + 3);

}

function getRowPosition(row) {
    return $(row).attr('id');
}

function getRowCount(table) {
    return $(table).find('.hours-row').length;
}

function assignButtonsToRow(table, row) {
    var btnGroupStart = "<div class='btn-group row-buttons' role='group'>"
    var deleteBtn = " <button type='button' class='delete-btn btn btn-danger'>Delete</button>";
    var addBtn = "<button type='button' class='add-btn btn btn-success'>Add</button>";
    var btnGroupEnd = "</div>";

    var position = +$(row).attr('id');
    var rowCount = +getRowCount(table);

    var html = rowCount > 1 ? btnGroupStart + addBtn + deleteBtn + btnGroupEnd : btnGroupStart + addBtn + btnGroupEnd;

    var buttonColumn = $(row).find('.col3');

    buttonColumn.html(html);
    buttonColumn.find('.add-btn').click(function (event) {
        addRow(row);
    });
    if (rowCount > 1) {
        buttonColumn.find('.delete-btn').click(function (event) {
            deleteRow(row);
        });
    }


}

function initSettings() {
    var wageHtml = '<div class="form-group"><label for="wage">Wage:</label><input type="number" id="wage" class="form-control" value=0 tabindex="98" /></div>';
    var taxHtml = '<div class="form-group"><label for="tax">Tax (%):</label><input type="number" id="tax" class="form-control" value=0 tabindex="99" /></div>';
    var submitBtnHtml = '<button class="calculate-btn btn btn-lg btn-block btn-primary" tabindex="100">Calculate</button><br>';
    settings_container.html(wageHtml + taxHtml + submitBtnHtml);

    $('.calculate-btn').click(function (event) {
        event.preventDefault();
        calculate();
    });
}

function initResults() {
    var validationHtml = '<div class="alert alert-warning"></div>';
    var hoursTotalHtml = '<h2 class="hours-total">Hours total: <span class="hours-and-minutes">x hours, y minutes</span> (<span class="hours-only">x,z hours</span>)</h2>';
    var beforeTaxHtml = '<h2 class="income-before">Income before tax: <span class="income-number">xx.yyy</span></h2>'
    var afterTaxHtml = '<h2 class="income-after">Income after tax: <span class="income-number">xx.yyy</span></h2>';
    result_container.hide();
    result_container.html(validationHtml + hoursTotalHtml + beforeTaxHtml + afterTaxHtml);
}

function calculate() {
    console.log("calc");
    var valid = validateInputs();
    if (valid) {

        var hours = '';
        // Grab all rows 
        $(table).find('.hours-row').each(function(index, row) {
            var start = $(row).find('.col1 .time-input').val();
            var end = $(row).find('.col2 .time-input').val();
            hours += start + "+" + end + ";"; // Append time input to string of hours
        });
        hours = hours.slice(0, -1); // Remove trailing semi-colon (;)

        // Grab wage and tax
        var wage = $('#wage').val();
        var tax = $('#tax').val();

        // Send parameters with AJAX to server
        console.log("about to send ajax");
        console.log(hours);
        console.log(wage);
        console.log(tax);
        $.ajax({
            type: "POST",
            url: "Home/Calculate",
            data: {
                hours: hours,
                wage: wage,
                tax: tax
            },
            success: function (data) {
                displayResults(JSON.parse(data));
            },
            dataType: "json",
            //contentType: "application/json"
        });
    }
}

function displayResults(data) {
    console.log(data);
    var hours = 0;
    var mins = 0;
    var split = data.totalHoursTime.split(':');
    if (split.length = 2) {
        hours = split[0];
        mins = split[1];
    }
    var hoursAndMinutes = hours + " hours, "+mins+" minutes";
    var hoursOnly = data.totalHoursDouble.toFixed(2) + " hours";
    var beforeTax = parseFloat(data.incomeBeforeTax).toFixed(2);
    var afterTax = parseFloat(data.incomeAfterTax).toFixed(2);

    $('.hours-and-minutes').text(hoursAndMinutes);
    $('.hours-only').text(hoursOnly);
    $('.income-before .income-number').text(beforeTax);
    $('.income-after .income-number').text(afterTax);

    result_container.slideDown("slow");
}

function validateInputs() {
    var timeInputs = $(table).find('.time-input');
    var noErrorsYet = true;

    timeInputs.each(function (index, inputField) {
        var time = $(inputField).val();
        var formGrp = $(inputField).parent('.form-group');
        if (validateTime(time)) {
            formGrp.addClass('has-success');
            formGrp.removeClass('has-error');
        } else {
            formGrp.addClass('has-error');
            formGrp.removeClass('has-success');
            noErrorsYet = false;
        }
        
    });

    var wageInput = $('#wage');
    var wageValid = validateWage(wageInput.val());
    var wageFormGrp = $(wageInput).parent('.form-group');
    if (wageValid) {
        wageFormGrp.addClass('has-success');
        wageFormGrp.removeClass('has-error');
    } else {
        wageFormGrp.addClass('has-error');
        wageFormGrp.removeClass('has-success');
        noErrorsYet = false;
    }

    var taxInput = $('#tax');
    var taxValid = validateTax(taxInput.val());
    var taxFormGrp = $(taxInput).parent('.form-group');
    if (taxValid) {
        taxFormGrp.addClass('has-success');
        taxFormGrp.removeClass('has-error');
    } else {
        taxFormGrp.addClass('has-error');
        taxFormGrp.removeClass('has-success');
        noErrorsYet = false;
    }


    return noErrorsYet;
}

function validateTime(time) {
    var split = time.split(':');
    if (split.length = 2) {
        var hours = split[0];
        var mins = split[1];

        if (!isNaN(hours) && (hours >= 0 || hours <= 23)) {
            return (!isNaN(mins) && (mins >= 0 || mins <= 59));
        } 
    }
    return false;
}

function validateWage(wage) {
    return (!isNaN(wage) && wage > 0);
}

function validateTax(tax) {
    return (!isNaN(tax) && (tax >= 0 || tax <= 100));
}