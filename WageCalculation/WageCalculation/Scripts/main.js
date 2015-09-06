$(document).ready(function () {
    
    var target = $('#target');

    var table_container = $('#table-container');
    var table;

    var settings_container = $('#settings-container');

    var result_container = $('#result-container');

    //initTable("Start time", "End time");
    addRow();


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
                                    "<th class='column-1'>"+col1+"</th>" +
                                    "<th class='column-2'>"+col2+"</th>" +
                                    "<th class='column-3'></th>" +
                                "</tr></thead>" +
                                "<tbody></tbody>" +
                             "</table>");

        table = $('.hours-table');
    }

    /**
     * Adds a row to the hours-table.
     * A row consists of 3 cells.
     * Cell 1 and 2 each contain an input field for the start/end times.
     * If the row is the first row in the table:
     *      Cell 3 contains only 1 button to add a new row below.
     * Else:
     *      Cell 3 contains 2 buttons; One to add a new row below, 
     *              and one to remove the row in which the button is located.  
     */
    function addRow() {
        if (!table)
            initTable();
    }




});