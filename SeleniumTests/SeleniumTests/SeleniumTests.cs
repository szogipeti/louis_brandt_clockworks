using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System.Collections.Generic;
using System.Linq;

namespace SeleniumTests
{
    [TestClass]
    public class SeleniumTests
    {
        ChromeDriver driver;
        [TestInitialize]
        public void Initialize()
        {
            driver = new ChromeDriver();
            driver.Manage().Window.Maximize();
            driver.Navigate().GoToUrl("http://localhost:8080");
        }
        [TestMethod]
        public void GoToShoppingPage()
        {
            driver.FindElement(By.CssSelector("nav li a")).Click();
            Assert.AreEqual("Items in your cart:", driver.FindElement(By.CssSelector("#item-container h2")).Text);
        }
        [TestMethod]
        public void GoToSearchPageEmpty()
        {
            driver.FindElement(By.CssSelector("nav li input[type=submit]")).Click();
            System.Threading.Thread.Sleep(500);
            ICollection<IWebElement> webElements = driver.FindElements(By.CssSelector("#item-container h5"));
            Assert.AreEqual("ora1", webElements.ElementAt(0).Text);
            Assert.AreEqual("ora2", webElements.ElementAt(1).Text);
            Assert.AreEqual("ora4", webElements.ElementAt(2).Text);
            Assert.AreEqual("ora3", webElements.ElementAt(3).Text);
        }
        [TestMethod]
        public void TestSearch()
        {
            driver.FindElement(By.CssSelector("input[type=search]")).SendKeys("1");
            driver.FindElement(By.CssSelector("nav li input[type=submit]")).Click();
            System.Threading.Thread.Sleep(500);
            Assert.AreEqual("ora1", driver.FindElement(By.CssSelector("#item-container h5")).Text);
        }
        [TestCleanup]
        public void ChromeDriverCleanup()
        {
            driver.Quit();
        }
    }
}
