using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WageCalculation.Models;
namespace WageCalculation.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {

            ViewBag.Message = "Quite possibly the best thing since sliced bread...";
            return View();
        }

        public ActionResult Qunit()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Calculate()
        {
            WageCalculatorModel model = new WageCalculatorModel();
            string hours = HttpContext.Request["hours"];
            string wage = HttpContext.Request["wage"];
            string tax = HttpContext.Request["tax"];
            //string json = "{hours: "+hours+"}";
            //calculations

            //new json string totalHours: xxxx incomeBeforeTax: xxxx IncomeAfterTax: xxxx
            var result = new JObject();

            result["totalHours"] = model.totalHours(hours);
            result["incomeBeforeTax"] = model.incomeBeforeTax(wage, hours);
            result["incomeAfterTax"] = model.incomeAfterTax(wage, hours, tax);

            var serialized = JsonConvert.SerializeObject(result);

            return Json(serialized, JsonRequestBehavior.AllowGet);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}