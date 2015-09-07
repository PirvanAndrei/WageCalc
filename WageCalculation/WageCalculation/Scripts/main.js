var target, table_container, table, settings_container, result_container;


$(document).ready(function () {
    
    target = $('#target');

    table_container = $('#table-container');
    table;

    settings_container = $('#settings-container');

    result_container = $('#result-container');

    initTable("Start time", "End time");







});


/**
 * Adds a table with header and empty body to the #table-container div.
 * The header contains the names of the first two columns, defined by varables col1 and col2.
 * Removes any content of the div before add the table.
 */
function initTable(col1, col2) {
    col1 = col1 ? col1 : "Start";
    col2 = col2 ? col2 : "End";


    table_container.html("<table class='hours-table table table-hover'>" +
                            "<thead><tr>" +
                                "<th class='column-1'>" + col1 + "</th>" +
                                "<th class='column-2'>" + col2 + "</th>" +
                                "<th class='column-3'></th>" +
                            "</tr></thead>" +
                            "<tbody>" +
                            "<tr class='hours-row'><td class='col1'><input type='text' /></td><td class='col2'><input type='text' /></td><td class='col3'></td></tr>" +
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
    if (!table)
        initTable();

    var rowHtml = "<tr class='hours-row'><td class='col1'><input type='text' /></td><td class='col2'><input type='text' /></td><td class='col3'></td></tr>";

    $(row).after(rowHtml);
    updateRows(table);

}

function deleteRow(row) {
    console.log("Delete");
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
        assignButtonsToRow(table, row);
    });
}

function getRowPosition(row) {
    return $(row).attr('id');
}

function getRowCount(table) {
    return $(table).find('.hours-row').length;
}

function assignButtonsToRow(table, row) {
    var deleteBtn = "<button class='delete-btn btn btn-danger'>Delete row</button>";
    var addBtn = "<button class='add-btn btn btn-success'>Add row</button>";

    var position = +$(row).attr('id');
    var rowCount = +getRowCount(table);

    var buttonColumn = $(row).find('.col3');

    buttonColumn.html(addBtn);
    buttonColumn.find('.add-btn').click(function (event) {
        addRow(row);
    });
    if (position > 1) {
        buttonColumn.append(deleteBtn);
        buttonColumn.find('.delete-btn').click(function (event) {
            deleteRow(row);
        });
    } 

}