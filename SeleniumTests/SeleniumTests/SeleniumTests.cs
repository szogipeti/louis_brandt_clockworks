using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium.Chrome;

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
        public void TestMethod1()
        {
        }
        [TestCleanup]
        public void ChromeDriverCleanup()
        {
            driver.Quit();
        }
    }
}
