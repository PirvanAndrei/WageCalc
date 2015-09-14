using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using WageCalculation.Models;

namespace WageCalculation.Tests.Models
{
    [TestClass]
    public class WageCalculationTest
    {
        [TestMethod]
        public void ToatalHours()

        {
            // Arrange
            WageCalculatorModel model = new WageCalculatorModel();

            // Act
            String time = "9:00+12:00;8:30+16:00";

            // Assert
            Assert.AreEqual(model.totalHours(time), "10:30");
        }

        [TestMethod]
        public void IncomeBeforeTax()

        {
            // Arrange
            WageCalculatorModel model = new WageCalculatorModel();

            // Act
            String time = "9:00+12:00;8:30+16:00";
            String wage = "100";

            // Assert
            Assert.AreEqual(model.incomeBeforeTax(wage,time), "1050");
        }

        [TestMethod]
        public void IncomeBeforeTaxToFail()

        {
            // Arrange
            WageCalculatorModel model = new WageCalculatorModel();

            // Act
            String time = "8:30+19:00";
            String wage = "120";

            // Assert
            Assert.AreNotEqual(model.incomeBeforeTax(wage, time), "1050");
        }

        [TestMethod]
        public void IncomeAfterTax()

        {
            // Arrange
            WageCalculatorModel model = new WageCalculatorModel();

            // Act
            String time = "9:00+12:00;8:30+16:00";
            String wage = "100";
            String tax = "50";

            // Assert
            Assert.AreEqual(model.incomeAfterTax(wage, time, tax), "525");
        }

        [TestMethod]
        public void IncomeAfterTaxWithDotSeparated()

        {
            // Arrange
            WageCalculatorModel model = new WageCalculatorModel();

            // Act
            String time = "8:30+19:00";
            String wage = "100,00";
            String tax = "50.00";

            // Assert
            Assert.AreEqual(model.incomeAfterTax(wage, time, tax), "525");
        }

        [TestMethod]
        public void IncomeAfterTaxWithCommaSeparated()

        {
            // Arrange
            WageCalculatorModel model = new WageCalculatorModel();

            // Act
            String time = "8:30+19:00";
            String wage = "100";
            String tax = "50,00";

            // Assert
            Assert.AreEqual(model.incomeAfterTax(wage, time, tax), "525");
        }

        [TestMethod]
        public void IncomeAfterTaxToFail()

        {
            // Arrange
            WageCalculatorModel model = new WageCalculatorModel();

            // Act
            String time = "8:30+19:00";
            String wage = "100";
            String tax = "40";

            // Assert
            Assert.AreNotEqual(model.incomeAfterTax(wage, time, tax), "525");
        }
    }
}
