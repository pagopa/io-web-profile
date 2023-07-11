import { render, screen } from "@testing-library/react"
import Access from "..";

test('prova',()=>{
    render(<Access/>);
    screen.debug();
    expect(screen.getByText('Access')).toBeInTheDocument();
})