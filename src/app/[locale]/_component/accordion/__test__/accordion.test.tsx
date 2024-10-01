import { renderWithProviders } from "@/app/[locale]/_utils/test-utils";
import { Accordion, AccordionProps } from "../accordion";
import { fireEvent, screen } from "@testing-library/react";

const accordionProps = {
  title: "Test title",
  subtitle: "Test subtitle",
  description: "Test description",
  accordionItems: [
    {
      header: "First item",
      content: "First content"
    }
  ],
  theme: 'light'
} as AccordionProps

describe('Accordion component', () => {

  test('should render accordion', async () => {
    let accordionStatus;
    const onToogleAccordion = (isOpen: boolean, index: number) => {
      accordionStatus = { isOpen, index }
    }
    await renderWithProviders(<div data-testid="accordion-component"><Accordion  {...accordionProps} onToogleAccordion={onToogleAccordion} /></div>);
    const element = await screen.findByTestId('accordion-component')
    expect(element).toBeInTheDocument();
    expect(await screen.findByText(accordionProps.title)).toBeInTheDocument();

    if (accordionProps.subtitle){
      expect(await screen.findByText(accordionProps.subtitle)).toBeInTheDocument();
    }
    accordionProps.accordionItems.forEach(async ({ header }) => {
      expect(await screen.findByText(header)).toBeInTheDocument();
    });
    const expandIcons = await screen.findAllByTestId("ExpandMoreIcon")
    expect(expandIcons.length).toBe(1)
    expect(accordionStatus).toBe(undefined)
    fireEvent.click(expandIcons[0]);
    expect(accordionStatus?.["isOpen"]).toBe(true)
    expect(accordionStatus?.["index"]).toBe(0)
    fireEvent.click(expandIcons[0]);
    expect(accordionStatus?.["isOpen"]).toBe(false)
    expect(accordionStatus?.["index"]).toBe(0)
  });

});
