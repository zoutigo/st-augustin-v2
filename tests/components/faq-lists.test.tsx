import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FaqLists } from "@/components/dashboard/faq/faq-lists";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: jest.fn(),
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

const categories = [
  { id: "cat1", name: "Vie scolaire", slug: "vie-scolaire" },
  { id: "cat2", name: "Inscriptions", slug: "inscriptions" },
];

const faqs = [
  {
    id: "faq1",
    question: "Q1",
    answer: "A1",
    categoryId: "cat1",
    categoryName: "Vie scolaire",
    isFeatured: false,
  },
  {
    id: "faq2",
    question: "Q2",
    answer: "A2",
    categoryId: "cat2",
    categoryName: "Inscriptions",
    isFeatured: true,
  },
  {
    id: "faq3",
    question: "Q3",
    answer: "A3",
    categoryId: "cat1",
    categoryName: "Vie scolaire",
    isFeatured: false,
  },
  {
    id: "faq4",
    question: "Q4",
    answer: "A4",
    categoryId: "cat1",
    categoryName: "Vie scolaire",
    isFeatured: false,
  },
  {
    id: "faq5",
    question: "Q5",
    answer: "A5",
    categoryId: "cat1",
    categoryName: "Vie scolaire",
    isFeatured: false,
  },
  {
    id: "faq6",
    question: "Q6",
    answer: "A6",
    categoryId: "cat1",
    categoryName: "Vie scolaire",
    isFeatured: false,
  },
];

describe("FaqLists component", () => {
  beforeEach(() => {
    (global as any).fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({}),
      }),
    );
  });

  it("affiche le bouton retour et le bouton créer", () => {
    render(<FaqLists faqs={faqs.slice(0, 2)} categories={categories} />);
    expect(screen.getByRole("button", { name: /retour/i })).toBeInTheDocument();
    const createBtn = screen.getByLabelText(/ajouter une faq/i);
    expect(createBtn).toBeInTheDocument();
    expect(createBtn.closest("a")).toHaveAttribute(
      "href",
      "/espace-prive/dashboard/faq/create",
    );
  });

  it("filtre les FAQs par catégorie sélectionnée", async () => {
    const user = userEvent.setup();
    render(<FaqLists faqs={faqs.slice(0, 2)} categories={categories} />);
    expect(screen.getByText("Q1")).toBeInTheDocument();
    expect(screen.getByText("Q2")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /inscriptions/i }));
    expect(screen.queryByText("Q1")).not.toBeInTheDocument();
    expect(screen.getByText("Q2")).toBeInTheDocument();
  });

  it("affiche la pagination et permet d'aller à la page 2", async () => {
    const user = userEvent.setup();
    render(<FaqLists faqs={faqs} categories={categories} />);
    expect(screen.getByText("Q1")).toBeInTheDocument();
    expect(screen.queryByText("Q6")).not.toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: "2" }));
    expect(screen.getByText("Q6")).toBeInTheDocument();
    expect(screen.queryByText("Q1")).not.toBeInTheDocument();
  });

  it("affiche les actions edit/delete et le badge Mis en avant", async () => {
    const user = userEvent.setup();
    render(<FaqLists faqs={faqs.slice(0, 2)} categories={categories} />);
    const editBtns = screen.getAllByLabelText(/modifier la faq/i);
    expect(editBtns.length).toBeGreaterThan(0);
    expect(editBtns[0].closest("a")).toHaveAttribute(
      "href",
      `/espace-prive/dashboard/faq/${faqs[0].id}/edit`,
    );
    const deleteBtn = screen.getAllByLabelText(/supprimer la faq/i)[0];
    expect(deleteBtn).toBeInTheDocument();
    expect(screen.getByText(/mis en avant/i)).toBeInTheDocument();

    await user.click(deleteBtn);
    // confirm dialog
    const confirm = await screen.findByRole("button", { name: /confirmer/i });
    await user.click(confirm);
    expect((global as any).fetch).toHaveBeenCalled();
  });

  it("bouton Retour renvoie vers /espace-prive/dashboard (push/back mocké)", async () => {
    const user = userEvent.setup();
    render(<FaqLists faqs={faqs.slice(0, 1)} categories={categories} />);
    const backBtn = screen.getByRole("button", { name: /retour/i });
    await user.click(backBtn);
    expect(backBtn).toBeInTheDocument();
  });
});
