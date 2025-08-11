from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the app
        page.goto("http://localhost:5173/")

        # Search for books
        page.get_by_label("Search for a book").fill("React")
        page.get_by_role("button", name="Search").click()

        # Wait for results to load
        expect(page.get_by_text("Loading...")).to_be_hidden()
        expect(page.get_by_text("No results found.")).to_be_hidden()

        # Take a screenshot of the search results
        page.screenshot(path="jules-scratch/verification/01_search_results.png")

        # Apply a filter
        # Wait for categories to be populated
        page.get_by_label("Category").click()
        # The categories are loaded dynamically, so we need to wait for them.
        # Let's assume a category 'Computers' will be there for a 'React' search.
        # This might be flaky.
        page.get_by_role('option', name='Computers').click()

        # Take a screenshot of the filtered results
        page.screenshot(path="jules-scratch/verification/02_filtered_results.png")

        # Add a book to the wishlist
        # Find the first "Add to Wishlist" button and click it
        add_to_wishlist_button = page.get_by_role("button", name="Add to Wishlist").first
        add_to_wishlist_button.click()

        # Verify it's in the wishlist
        expect(page.get_by_text("In Wishlist")).to_be_visible()

        # Take a screenshot of the wishlist
        page.screenshot(path="jules-scratch/verification/03_wishlist.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
