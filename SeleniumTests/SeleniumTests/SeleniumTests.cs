using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.DevTools.V107.Profiler;
using OpenQA.Selenium.Interactions;
using System.Collections.Generic;
using System.Diagnostics;
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
            GoToShoppingCart();
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
        private void GoToItemPage()
        {
            Actions actions = new Actions(driver);
            actions.ScrollByAmount(0, 400);
            actions.Perform();
            System.Threading.Thread.Sleep(500);
            IWebElement element = driver.FindElement(By.CssSelector("#item-container a"));
            try
            {
                element.Click();
            }
            catch
            {
                element.Click();
            }
        }
        private void GoToShoppingCart()
        {
            driver.FindElement(By.CssSelector("nav li a")).Click();
        }
        [TestMethod]
        public void TestItemPage()
        {
            GoToItemPage();
            System.Threading.Thread.Sleep(500);
            Assert.AreEqual("ora1", driver.FindElement(By.CssSelector("#item-container h2")).Text);
        }
        [TestMethod]
        public void TestPurchase()
        {
            GoToShoppingCart();
            driver.FindElement(By.Id("purchaseBtn")).Click();
            Assert.AreEqual("Louis Brandt Clockworks", driver.FindElement(By.TagName("h1")).Text);
            driver.FindElement(By.CssSelector("nav li a")).Click();
            Assert.AreEqual("Full Price: 0 USD", driver.FindElement(By.Id("fullPrice")).Text);
        }
        [TestMethod]
        public void TestAddToShoppingCart()
        {
            GoToShoppingCart();
            driver.FindElement(By.Id("purchaseBtn")).Click();
            GoToItemPage();
            System.Threading.Thread.Sleep(500);
            driver.FindElement(By.TagName("button")).Click();
            GoToShoppingCart();
            Assert.AreEqual("Full Price: 1000 USD", driver.FindElement(By.Id("fullPrice")).Text);
        }
        [TestMethod]
        public void TestPlusButton()
        {
            GoToShoppingCart();
            driver.FindElement(By.Id("purchaseBtn")).Click();
            GoToItemPage();
            System.Threading.Thread.Sleep(500);
            driver.FindElement(By.TagName("button")).Click();
            GoToShoppingCart();
            driver.Navigate().Refresh();
            System.Threading.Thread.Sleep(500);
            driver.FindElement(By.Id("plusBtn")).Click();
            System.Threading.Thread.Sleep(500);
            Assert.AreEqual("2", driver.FindElement(By.Id("quantity")).Text);
            Assert.AreEqual("Full Price: 2000 USD", driver.FindElement(By.Id("fullPrice")).Text);

        }
        [TestMethod]
        public void TestMinusButton()
        {
            GoToShoppingCart();
            driver.FindElement(By.Id("purchaseBtn")).Click();
            GoToItemPage();
            System.Threading.Thread.Sleep(500);
            driver.FindElement(By.TagName("button")).Click();
            GoToShoppingCart();
            driver.Navigate().Refresh();
            System.Threading.Thread.Sleep(500);
            driver.FindElement(By.Id("plusBtn")).Click();
            System.Threading.Thread.Sleep(500);
            driver.FindElement(By.Id("minusBtn")).Click();
            System.Threading.Thread.Sleep(500);
            Assert.AreEqual("1", driver.FindElement(By.Id("quantity")).Text);
            Assert.AreEqual("Full Price: 1000 USD", driver.FindElement(By.Id("fullPrice")).Text);
        }
        [TestCleanup]
        public void ChromeDriverCleanup()
        {
            driver.Quit();
        }
    }
}
