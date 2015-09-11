using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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

            string hours = HttpContext.Request["hours"];
            string json = "{hours: "+hours+"}";
            return Json(json, JsonRequestBehavior.AllowGet);
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