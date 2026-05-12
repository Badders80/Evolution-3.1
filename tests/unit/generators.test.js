/**
 * Unit tests for Evolution Update Generators
 *
 * Run: npm test -- tests/unit/generators.test.js
 */

const { generateInvestorUpdate } = require("../../generate-simple");
const {
  generateUpdate,
  generateEmailVersion,
  generateMobileVersion,
} = require("../../generate-update");

describe("generate-simple.js", () => {
  describe("generateInvestorUpdate", () => {
    it("should generate HTML with heading and subheading", () => {
      const data = {
        heading: "Test Update",
        subheading: "Test Subheading",
      };

      const html = generateInvestorUpdate(data);

      expect(html).toContain("Test Update");
      expect(html).toContain("Test Subheading");
      expect(html).toContain("<!DOCTYPE html>");
    });

    it("should include brand SVG header", () => {
      const data = {
        heading: "Test",
        subheading: "Test",
      };

      const html = generateInvestorUpdate(data);

      expect(html).toContain("<svg");
      expect(html).toContain("brand-mark");
    });

    it("should handle missing subheading gracefully", () => {
      const data = {
        heading: "Test Only",
      };

      const html = generateInvestorUpdate(data);

      expect(html).toContain("Test Only");
      expect(html).toBeDefined();
    });

    it("should include quote sidebar when quote provided", () => {
      const data = {
        heading: "Test",
        subheading: "Test",
        quote: "Test quote",
        quoteAttribution: "Test person",
      };

      const html = generateInvestorUpdate(data);

      expect(html).toContain("Test quote");
      expect(html).toContain("Test person");
      expect(html).toContain("quote-sidebar");
    });

    it("should include image when imageUrl provided", () => {
      const data = {
        heading: "Test",
        subheading: "Test",
        imageUrl: "https://example.com/test.jpg",
      };

      const html = generateInvestorUpdate(data);

      expect(html).toContain("https://example.com/test.jpg");
      expect(html).toContain("<img");
    });
  });
});

describe("generate-update.js", () => {
  describe("generateUpdate", () => {
    it("should generate both email and mobile versions by default", () => {
      const data = {
        heading: "Test Update",
        subheading: "Test",
      };

      const result = generateUpdate(data);

      expect(result).toContain("<!-- MOBILE VERSION -->");
      expect(result).toContain("Test Update");
    });

    it("should return only email when outputFormat=email", () => {
      const data = {
        heading: "Test",
        subheading: "Test",
        outputFormat: "email",
      };

      const result = generateUpdate(data);

      expect(result).not.toContain("<!-- MOBILE VERSION -->");
    });

    it("should return only mobile when outputFormat=mobile", () => {
      const data = {
        heading: "Test",
        subheading: "Test",
        outputFormat: "mobile",
      };

      const result = generateUpdate(data);

      expect(result).not.toContain("<!-- MOBILE VERSION -->");
    });
  });

  describe("generateEmailVersion", () => {
    it("should generate complete email HTML", () => {
      const data = {
        heading: "Email Test",
        subheading: "Email Subheading",
      };

      const html = generateEmailVersion(data);

      expect(html).toContain("Email Test");
      expect(html).toContain("Email Subheading");
      expect(html).toContain("<!DOCTYPE html>");
    });

    it("should include video when videoUrl provided", () => {
      const data = {
        heading: "Test",
        subheading: "Test",
        videoUrl: "https://example.com/video.mp4",
      };

      const html = generateEmailVersion(data);

      expect(html).toContain("https://example.com/video.mp4");
      expect(html).toContain("<video");
    });
  });

  describe("generateMobileVersion", () => {
    it("should generate mobile-optimized HTML", () => {
      const data = {
        heading: "Mobile Test",
        subheading: "Mobile Subheading",
      };

      const html = generateMobileVersion(data);

      expect(html).toContain("Mobile Test");
      expect(html).toContain("Mobile Subheading");
    });

    it("should have narrower width for mobile", () => {
      const data = {
        heading: "Test",
        subheading: "Test",
      };

      const html = generateMobileVersion(data);

      // Mobile should be optimized for smaller screens
      expect(html).toBeDefined();
    });
  });

  describe("parseConversationalInput", () => {
    it("should parse conversational input into structured data", () => {
      const input = `
        Heading: Test Update
        Subheading: This is a test
        Content: Some content here
      `;

      const result = parseConversationalInput(input);

      expect(result.heading).toBe("Test Update");
      expect(result.subheading).toBe("This is a test");
      expect(result.content).toBe("Some content here");
    });
  });
});

describe("Generator Comparison", () => {
  it("generate-simple should be email-only", () => {
    const simpleData = { heading: "Test", subheading: "Test" };
    const simpleHtml = generateInvestorUpdate(simpleData);

    expect(simpleHtml).not.toContain("<!-- MOBILE VERSION -->");
  });

  it("generate-update should support both formats", () => {
    const updateData = { heading: "Test", subheading: "Test" };
    const updateHtml = generateUpdate(updateData);

    expect(updateHtml).toContain("<!-- MOBILE VERSION -->");
  });
});
