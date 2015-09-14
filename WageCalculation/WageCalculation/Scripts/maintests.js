QUnit.module("Table module", {
    beforeEach: function() {
        initTable(); // Setup environment for tests
    }
});

QUnit.test("Initial table structure", function (assert) {

    // Verify that table is added to the right container
    var mytable = $('div.table-container .hours-tabel');
    assert.notEqual(mytable, null, "should be added to div.table-container");

    // Verify that a row is being added
    var rowCount = $('.hours-table .hours-row').length;
    assert.equal(rowCount, 1, "should have 1 row");

    


});

QUnit.test("Initial row structure", function (assert) {

    var btnCount = $('.hours-table .hours-row button').length;
    assert.equal(btnCount, 1, "should have 1 button");

    var addBtnCount = $('.hours-table .hours-row .add-btn').length;
    assert.equal(addBtnCount, 1, "should have 1 Add-button");

    var delBtnCount = $('.hours-table .hours-row .delete-btn').length;
    assert.equal(delBtnCount, 0, "should not have a Delete-button");

    var id = $('.hours-table .hours-row').attr('id');
    assert.equal(id, 1, "should set id on .hours-row to show position in table");

});

QUnit.test("Click 'Add' on first (and last) row", function(assert) {

    var rowCountBefore = $('.hours-table .hours-row').length;
    var input1Before = $('#1 .col1 .time-input').val();
    var input2Before = $('#1 .col1 .time-input').val();

    firstRowAddBtn = $('#1 .add-btn');
    firstRowAddBtn.click();


    var rowCount = $('.hours-table .hours-row').length;
    var input1After = $('#1 .col1 .time-input').val();
    var input2After = $('#1 .col2 .time-input').val();

    var expectedRowCount = rowCountBefore + 1;
    assert.equal(rowCount, expectedRowCount, "should increment row count by 1.");
    assert.equal(input1Before, input1After, "should not affect input field in column 1.");
    assert.equal(input2Before, input2After, "should not affect input field in column 2.");

    var btnCount = $('#2 button').length;
    assert.equal(btnCount, 2, "should give the new row 2 buttons");
    var addBtnCount = $('#2 .add-btn').length;
    var delBtnCount = $('#2 .delete-btn').length;
    assert.equal(addBtnCount, 1, "should give the new row 1 'add' button");
    assert.equal(delBtnCount, 1, "should give the new row 1 'delete' button");


});

QUnit.test("Clicking 'Add' on a row that isn't last", function(assert) {

    // Fake a user who clicks 'Add' on row #1
    $('#1 .add-btn').click();

    // Fake user input in row 1 and 2
    $('#1 .col1 .time-input').val('12:00');
    $('#1 .col2 .time-input').val('16:00');
    $('#2 .col1 .time-input').val('9:00');
    $('#2 .col2 .time-input').val('14:00');

    // Fake user clicking 'Add' on row #1 again
    $('#1 .add-btn').click();

    // A new empty row should be inserted below row 1.
    var rows = $('.hours-row');
    var secondRow = rows[1]; // 0-based index
    var secondRowInput1 = $(secondRow).find('.col1 .time-input').val();
    var secondRowInput2 = $(secondRow).find('.col2 .time-input').val();
    assert.equal(secondRowInput1.length + secondRowInput2.length, 0, "should add a row with empty input fields");

    // Should move contents of row 2 to row 3 (one step down)
    var thirdRowInput1 = $('#3 .col1 .time-input').val();
    var thirdRowInput2 = $('#3 .col2 .time-input').val();
    assert.equal(thirdRowInput1, "9:00", "should move contents from 2nd row to 3rd row (column 1)");
    assert.equal(thirdRowInput2, "14:00", "should move contents from 2nd row to 3rd row (column 2)");

});

QUnit.test("Clicking 'delete' row", function (assert) {

    // Fake user adding rows
    $('#1 .add-btn').click();
    $('#1 .add-btn').click();

    // We now have 3 rows
    var rowCountBefore = $('.hours-row').length;

    // Fake user input in row 3
    $('#3 .col1 .time-input').val("12:00");
    $('#3 .col2 .time-input').val("16:00");

    // Fake user clicking 'delete' on row 2
    $('#2 .delete-btn').click();

    var rowCountAfter = $('.hours-row').length;
    assert.equal(rowCountAfter, rowCountBefore - 1, "should decrement row count by 1.");

    // Check that content from row 3 is moved to row 2
    var row2col1 = $('#2 .col1 .time-input').val();
    var row2col2 = $('#2 .col2 .time-input').val();
    assert.equal(row2col1, "12:00", "should move contents of [row 3, column 1] to [row 2, column 1]");
    assert.equal(row2col2, "16:00", "should move contents of [row 3, column 2] to [row 2, column 2]");

});

QUnit.test("Tabindices", function(assert) {

    // Should be assigned correctly to row input fields before adding more rows
    var row1col1 = $('#1 .col1 .time-input').attr('tabindex');
    var row1col2 = $('#1 .col2 .time-input').attr('tabindex');

    assert.equal(row1col1, 1, "should assign tabindex=1 to first input field in first row.");
    assert.equal(row1col2, 2, "should assign tabindex=2 to second input field in first row.");

    // Should be assigned correctly to #wage before
    var wageIndex = $('#wage').attr('tabindex');
    assert.equal(wageIndex, 3, "should assign wage input field a tabindex right after the last input field in rows");

    // Should be assigned correctly to #tax before
    var taxIndex = $('#tax').attr('tabindex');
    assert.equal(taxIndex, 4, "should assign tax input field a tabindex right after wage input field");

    // Should be assigned correctly to .calculate-btn before
    var calculateIndex = $('.calculate-btn').attr('tabindex');
    assert.equal(calculateIndex, 5, "should assign tabindex for calculate button to be right after tax input field.");

    // Fake a click on row #1 'Add' button
    $('#1 .add-btn').click();


    // Should be assigned correctly to row input fields AFTER adding more rows
    row1col1 = $('#1 .col1 .time-input').attr('tabindex');
    row1col2 = $('#1 .col2 .time-input').attr('tabindex');
    var row2col1 = $('#2 .col1 .time-input').attr('tabindex');
    var row2col2 = $('#2 .col2 .time-input').attr('tabindex');

    assert.equal(row1col1, 1, "should stay the same in first input field in first row");
    assert.equal(row1col2, 2, "should stay the same in second input field in first row");
    assert.equal(row2col1, 3, "should assign tabindex=3 to first input field in second row");
    assert.equal(row2col2, 4, "should assign tabindex=4 to second input field in second row");


    // Should be assigned correctly to #wage AFTER
    wageIndex = $('#wage').attr('tabindex');
    assert.equal(wageIndex, 5, "should update wage input field's tabindex to be right after the last input field in rows");
    // Should be assigned correctly to #tax AFTER
    taxIndex = $('#tax').attr('tabindex');
    assert.equal(taxIndex, 6, "should update tax input field's tabindex to be right after wage input field");
    // Should be assigned correctly to .calculate-btn AFTER
    calculateIndex = $('.calculate-btn').attr('tabindex');
    assert.equal(calculateIndex, 7, "should update tabindex for calculate button to be right after tax input field.");


});

QUnit.module("Validation module", {
    beforeEach: function () {
        initTable(); // Setup environment for tests
    }
});

QUnit.test("Validating time input", function(assert) {
    var input1_valid = validateTime("9:00");
    var input2_valid = validateTime("09:00");
    var input3_valid = validateTime("00:00");
    var input4_valid = validateTime("23:59");

    assert.equal(input1_valid, true, "should allow hours with 1 digit");
    assert.equal(input2_valid, true, "should allow hours specified with 2 digits");
    assert.equal(input3_valid, true, "should allow 00:00 (lowest possible value)");
    assert.equal(input4_valid, true, "should allow 23:59 (highest possible value)");

    var input5_invalid = validateTime("900");
    var input6_invalid = validateTime(":55");
    var input7_invalid = validateTime("9:");
    var input8_invalid = validateTime(":9:00");
    var input9_invalid = validateTime("-01.00");
    var input10_invalid = validateTime("00.-01");
    var input11_invalid = validateTime("24:00");
    var input12_invalid = validateTime("12:60");
    var input13_invalid = validateTime("12 am");

    assert.equal(input5_invalid, false, "should not numbers without semi-colon");
    assert.equal(input6_invalid, false, "should not allow blank hours");
    assert.equal(input7_invalid, false, "should not allow blank minutes");
    assert.equal(input8_invalid, false, "should not allow multiple semi-colons");
    assert.equal(input9_invalid, false, "should not allow hours below 0");
    assert.equal(input10_invalid, false, "should not allow minutes below 0");
    assert.equal(input11_invalid, false, "should not allow hours above 23");
    assert.equal(input12_invalid, false, "should not allow minutes above 59");
    assert.equal(input13_invalid, false, "should not allow non-numeric input");
});

QUnit.test("Validating wage input", function(assert) {
    var input1_valid = validateWage("1");
    var input2_valid = validateWage("0.0001");
    var input3_valid = validateWage("50.25");
    var input4_valid = validateWage("50,25");

    assert.equal(input1_valid, true, "should allow wage of 1 (lowest acceptable integer value)");
    assert.equal(input2_valid, true, "should allow value below 1 and above 0");
    assert.equal(input3_valid, true, "should allow double values using dot seperator");
    assert.equal(input4_valid, true, "should allow double values using comma seperator");

    var input5_invalid = validateWage("0");
    var input6_invalid = validateWage("-1");
    var input7_invalid = validateWage("");
    var input8_invalid = validateWage("five");

    assert.equal(input5_invalid, false, "should not allow wage to be 0");
    assert.equal(input6_invalid, false, "should not allow wage to be negative");
    assert.equal(input7_invalid, false, "should not allow wage to be unspecified");
    assert.equal(input8_invalid, false, "should not allow wage to contain non-numeric characters");
});

QUnit.test("Validating tax input", function(assert) {
    var input1_valid = validateTax("0");
    var input2_valid = validateTax("50.25");
    var input3_valid = validateTax("50,25");
    var input4_valid = validateTax("100");

    assert.equal(input1_valid, true, "should allow tax percentage of 0 (lowest acceptable value)");
    assert.equal(input2_valid, true, "should allow double values using dot seperator");
    assert.equal(input3_valid, true, "should allow double values using comma seperator");
    assert.equal(input4_valid, true, "should allow values up to and including 100");

    var input5_invalid = validateTax("-1");
    var input6_invalid = validateTax("101");
    var input7_invalid = validateTax("");
    var input8_invalid = validateTax("five");

    assert.equal(input5_invalid, false, "should not allow tax to be negative");
    assert.equal(input6_invalid, false, "should not allow tax to be above 100%");
    assert.equal(input7_invalid, false, "should not allow tax to be unspecified");
    assert.equal(input8_invalid, false, "should not allow tax to contain non-numeric characters");
});

QUnit.test("Displaying validation feedback", function(assert) {
    
    // Fake user input in row 1
    $('#1 .col1 .time-input').val("9:00"); // Valid input
    $('#1 .col2 .time-input').val("24:00"); // Invalid input

    // Fake user input in wage and tax
    $('#wage').val("500"); // Valid
    $('#tax').val("140"); // Invalid

    // Display validation feedback
    validateInputs();

    // Extract bootstrap validation feedback classes from parent form-groups
    var input1_valid = $('#1 .col1 .form-group').hasClass('has-success') && !$('#1 .col1 .form-group').hasClass('has-error');
    var input2_invalid = $('#1 .col2 .form-group').hasClass('has-error') && !$('#1 .col2 .form-group').hasClass('has-success');
    var input3_valid = $('#wage').parent(".form-group").hasClass('has-success') && !$('#wage').parent(".form-group").hasClass('has-error');
    var input4_invalid = $('#tax').parent(".form-group").hasClass('has-error') && !$('#tax').parent(".form-group").hasClass('has-success');

    assert.equal(input1_valid, true, "should display success for valid row input");
    assert.equal(input2_invalid, true, "should display error for invalid row input");
    assert.equal(input3_valid, true, "should display success for valid wage input");
    assert.equal(input4_invalid, true, "should display error for invalid tax input");

});


QUnit.module("AJAX module", {
    beforeEach: function () {
        initTable(); // Setup environment for tests
        $('#1 .col1 .time-input').val("9:00"); // 6,5 hours
        $('#1 .col2 .time-input').val("15:30");
        $('#1 .add-btn').click();
        $('#2 .col1 .time-input').val("8:00"); // 8 hours
        $('#2 .col2 .time-input').val("16:00");
        $('#wage').val("100"); // Wage is 100
        $('#tax').val("50"); // Tax is 50 %
        // All valid inputs
    }
});

QUnit.asyncTest("Endpoint for AJAX", function(assert) {

    expect(1);

    $('.calculate-btn').click();

    setTimeout(function () {
        
        var hoursOnly = $('.hours-only').text();
        var hoursOnlyExpected = "14.50 hours";
        assert.equal(hoursOnly, hoursOnlyExpected, "should calculate and display hours total (double format)");
        start();
    }, 1000);


})