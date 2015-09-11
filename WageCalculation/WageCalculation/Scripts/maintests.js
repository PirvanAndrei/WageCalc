QUnit.module("Table module", {
    beforeEach: function() {
        initTable(); // Setup environment for tests
    }
});

QUnit.test("Table structure", function (assert) {

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

QUnit.test("Click 'Add' on first row", function(assert) {

    var rowCountBefore = $('.hours-table .hours-row').length;
    firstRowAddBtn = $('#1 .add-btn');
    firstRowAddBtn.click();
    var rowCount = $('.hours-table .hours-row').length;
    var expectedRowCount = rowCountBefore + 1;
    assert.equal(rowCount, expectedRowCount, "should increment row count by 1.");

});

