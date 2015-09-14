using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Globalization;
using System.Threading;
using System.Text.RegularExpressions;

namespace WageCalculation.Models
{
    public class WageCalculatorModel
    {
        public String time { get; set; }
        public String wage { get; set; }
        public String tax { get; set; }

        public Boolean validation (String time, String wage, String tax) // 12:00 + 15:00; 15:00 + 23:00
        {
            //Regex r = new Regex("[^0-9.$ ]$");
            //if (!r.IsMatch(time) || !r.IsMatch(wage) || !r.IsMatch(tax)) return false; // other chars than numbers ., ,, +, 


            var Days = time.Split(';');
            string endTime;

           

            foreach (string day in Days)
            {
                if (int.Parse(day.Split(':')[0]) < 0 || int.Parse(day.Split(':')[0]) > 23) return false; // stat hour bigger than 0 and lower than 24
                endTime = day.Split('+')[1];
                if (int.Parse(endTime.Split(':')[0]) < 0 || int.Parse(endTime.Split(':')[0]) > 23) return false; // end hour bigger than 0 and lower than 24
                if (int.Parse(dayHours(day).Split(':')[0]) < 0) return false; // the difference is positive 
            }

            if (int.Parse(wage) < 0 || int.Parse(wage) > 500) return false;
            if (int.Parse(tax) < 0 || int.Parse(tax) > 100) return false;



            return true;

        }

        public String incomeAfterTax(String wage, String time, String tax)
        {
            Thread.CurrentThread.CurrentCulture = new CultureInfo("en-US");

            double income = 0.000;
            double taxPercent = 0.00;

            if (wage.Contains(','))
            {
                wage = wage.Replace(',', '.');
            }
            if (tax.Contains(','))
            {
                tax = tax.Replace(',', '.');
            }

            taxPercent = double.Parse(tax) / 100;
            var totalTime = totalHours(time);
            income = (double.Parse(wage) * parseIntoDouble(totalTime));
            income -= income * taxPercent;

            return "" + income;
        }


        public String incomeBeforeTax(String wage, String time)
        {
            Thread.CurrentThread.CurrentCulture = new CultureInfo("en-US");
            double income = 0.000;

            if (wage.Contains(','))
            {
                wage = wage.Replace(',', '.');
            }
            var totalTime = totalHours(time);

            income = double.Parse(wage) * parseIntoDouble(totalTime);

            return "" + income;
        }

        public double parseIntoDouble(String time)
        {
            double result = 0.00;

            double minutes = 0;
            int hours = 0;

            minutes = double.Parse(time.Split(':')[1]) / 60;
            hours = int.Parse(time.Split(':')[0]);

            result = hours + minutes;
            return result;
        }

        public string totalHours(string time)
        {
            var Days = time.Split(';');

            int hours = 0;
            int minutes = 0;

            foreach (string day in Days)
            {
                hours += int.Parse(dayHours(day).Split(':')[0]);
                minutes += int.Parse(dayHours(day).Split(':')[1]);
            }

            hours = hours + (int)(minutes / 60);
            minutes = (int)(minutes % 60);
            if (minutes < 10)
            {
                time = hours + ":0" + minutes;
            }
            else
                time = hours + ":" + minutes;

            return time;
        }

        public String dayHours(String day)
        {
            var Day = day.Split('+');
            var startHour = Day[0].Split(':')[0];//9
            var startMinute = Day[0].Split(':')[1];//02

            var endHour = Day[1].Split(':')[0];//12
            var endMinute = Day[1].Split(':')[1];//00


            var totalHours = int.Parse(endHour) - int.Parse(startHour);
            var totalMinutes = int.Parse(endMinute) - int.Parse(startMinute);

            if (totalMinutes < 0)
            {
                totalHours--;
                totalMinutes = totalMinutes + 60;
            }
            return "" + totalHours + ':' + totalMinutes;
        }
    }



}

