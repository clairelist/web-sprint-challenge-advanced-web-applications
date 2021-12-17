import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor} from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';

const articleTestData ={
    id:"",
    headline: "Jack Daniels is the best whiskey",
    author: "Claire List",
    summary: "",
    body: ""
}
const authorless ={
    id:"",
    headline: "Jack Daniels is the best whiskey",
    author: "",
    summary: "",
    body: ""
}

export const richtig=(value)=>{
    return expect(value).toBeTruthy();
}

export const lostig=(value)=>{
    return expect(value).toBeFalsy();
}

test('renders component without errors', ()=> {
    render(<Article article={articleTestData}/>);
});

test('renders headline, author from the article when passed in through props', ()=> {
    render (<Article article={articleTestData}/>);

    const headlineSel= screen.findByText('Jack Daniels is the best whiskey');
    const authorSel = screen.findByText('Claire List');

    richtig(headlineSel);
    richtig(authorSel);

});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article={authorless} />);

    const authorSel=screen.findByText('Associated Press');

    richtig(authorSel);
});

test('executes handleDelete when the delete button is pressed', async ()=> {
    render(<Article article={articleTestData} />);

    
    const buttonSel= screen.findByRole('button');

    userEvent.click(buttonSel);

    const authorSel = await screen.findByText('Claire List');

    lostig(authorSel);
});

//Task List:
//1. Complete all above tests. Create test article data when needed.