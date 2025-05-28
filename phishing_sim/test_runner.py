import unittest
import asyncio
from unittest.mock import patch, MagicMock
from pyppeteer import launch
from runner import main

class TestRunner(unittest.TestCase):

    @patch('runner.launch')
    def test_main(self, mock_launch):
        # Mock the browser and page objects
        mock_browser = MagicMock()
        mock_page = MagicMock()
        mock_launch.return_value = mock_browser
        mock_browser.newPage.return_value = mock_page

        # Mock the methods on the page object directly
        mock_page.goto.return_value = None
        mock_page.evaluate.return_value = {'key1': 'value1', 'key2': 'value2'}
        mock_page.cookies.return_value = [{'name': 'cookie1', 'value': 'value1'}, {'name': 'cookie2', 'value': 'value2'}]

        # Run the main function
        asyncio.run(main())

        # Assert that the browser and page methods were called
        mock_launch.assert_called_once_with(headless=True)
       
