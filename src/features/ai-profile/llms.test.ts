import { describe, expect, test } from "bun:test";
import { siteConfig } from "@/constants/site.config";
import { resume, resumeContact } from "@/constants/resume";
import {
  buildLlmsTxt,
  buildLlmsFullTxt,
  normalizeOrganization,
  countCompanies,
} from "./llms";
import { buildPersonJsonLd } from "./person";

describe("buildLlmsTxt", () => {
  const txt = buildLlmsTxt();
  test("H1 and summary blockquote", () => {
    expect(txt.startsWith("# ")).toBe(true);
    expect(txt.split("\n")[0]).toContain("Soma Takata");
    expect(txt).toMatch(/^> .+/m);
  });
  test("highlights", () => {
    for (const s of ["1st", "IBM", "540", "40%", "SORACOM"]) {
      expect(txt).toContain(s);
    }
  });
  test("links, contact, pointer", () => {
    expect(txt).toContain(siteConfig.origin);
    for (const url of Object.values(siteConfig.socials)) expect(txt).toContain(url);
    expect(txt).toContain(resumeContact.email);
    expect(txt).toContain(`${siteConfig.origin}/llms-full.txt`);
    expect(txt).toContain(`${siteConfig.origin}/en/experience`);
    expect(txt).toContain(siteConfig.resume.en.href);
  });
});

describe("buildLlmsFullTxt", () => {
  const txt = buildLlmsFullTxt();
  test("starts with H1 and has highlights", () => {
    expect(txt.startsWith("# ")).toBe(true);
    expect(txt).toContain("40%");
    expect(txt).toContain("540");
  });
  test("contains every organization in both languages", () => {
    for (const e of resume.en.experience) expect(txt).toContain(e.organization);
    for (const e of resume.ja.experience) expect(txt).toContain(e.organization);
  });
  test("contains news links", () => {
    expect(txt).toContain("https://blog.soracom.com/");
  });
});

describe("company count", () => {
  test("normalization", () => {
    expect(normalizeOrganization("Nulogic Inc.")).toBe(normalizeOrganization("Nulogic Inc."));
    expect(normalizeOrganization("Mercari Inc. (Hallo Div.)")).toBe("Mercari");
    expect(normalizeOrganization("SORACOM, Inc.")).toBe("SORACOM");
    expect(normalizeOrganization("Recruit Co., Ltd.")).toBe("Recruit");
  });
  test("equals unique normalized orgs", () => {
    const expected = new Set([
      "IBM Japan", "SORACOM", "D4V", "Nulogic", "Mercari", "NOT A HOTEL",
      "Medley", "LayerX", "How Television", "Michibiku Group", "Recruit",
    ]);
    expect(countCompanies()).toBe(expected.size);
    const got = new Set(resume.en.experience.map((e) => normalizeOrganization(e.organization)));
    expect(got).toEqual(expected);
  });
  test("llms.txt mentions computed count", () => {
    expect(buildLlmsTxt()).toContain(`${countCompanies()} companies`);
  });
});

describe("buildPersonJsonLd", () => {
  const ld = buildPersonJsonLd("en") as Record<string, any>;
  test("shape", () => {
    expect(ld["@context"]).toBe("https://schema.org");
    expect(ld["@type"]).toBe("Person");
    expect(ld.name).toBe("Soma Takata");
    expect(ld.alternateName).toEqual(["高田颯真", "髙田颯真", "SomaTakata"]);
    expect(ld.image).toBe("https://somatakata.com/soma.png");
    expect(ld.email).toBe(resumeContact.email);
    expect(ld.sameAs).toEqual(Object.values(siteConfig.socials));
    expect(ld.alumniOf["@type"]).toBe("CollegeOrUniversity");
    expect(ld.alumniOf.name).toBe("Shibaura Institute of Technology");
    expect(ld.knowsAbout).toContain("TypeScript");
    expect(JSON.stringify(ld.award)).toContain("IBM");
    expect(ld.description).toContain("ShibaYoko");
  });
  test("ja locale differs in url/description", () => {
    const ja = buildPersonJsonLd("ja") as Record<string, any>;
    expect(ja.url).toBe("https://somatakata.com/ja");
    expect(ja.jobTitle).toBe("ソフトウェアエンジニア");
  });
});
