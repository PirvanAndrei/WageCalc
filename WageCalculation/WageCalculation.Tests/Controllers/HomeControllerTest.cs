using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using WageCalculation;
using WageCalculation.Controllers;
using WageCalculation.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace WageCalculation.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void Calculate()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act

            WageCalculatorModel model = new WageCalculatorModel();
            
            var result = new JObject();

            result["totalHoursTime"] = model.totalHours("9:00+12:00;8:30+16:00");
            result["totalHoursDouble"] = model.parseIntoDouble(model.totalHours("9:00+12:00;8:30+16:00"));
            result["incomeBeforeTax"] = model.incomeBeforeTax("100", "9:00+12:00;8:30+16:00");
            result["incomeAfterTax"] = model.incomeAfterTax("100", "9:00+12:00;8:30+16:00", "50");

            var serialized = JsonConvert.SerializeObject(result);

            // Assert

            Assert.AreEqual(serialized, "{\"totalHoursTime\":\"10:30\",\"totalHoursDouble\":10.5,\"incomeBeforeTax\":\"1050\",\"incomeAfterTax\":\"525\"}");

        }


        [TestMethod]
        public void Index()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.Index() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Quite possibly the best thing since sliced bread...", result.ViewBag.Message);
           
        }

        [TestMethod]
        public void Qunit()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.Qunit() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void About()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.About() as ViewResult;

            // Assert
            Assert.AreEqual("Your application description page.", result.ViewBag.Message);
        }

        [TestMethod]
        public void Contact()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.Contact() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }
    }
}
