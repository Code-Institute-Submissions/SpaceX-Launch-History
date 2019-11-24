# SpaceX Launch History
 A history of SpaceX launches that uses the SpacexAPI. This enables you to find spacex launches by year, it will then dispaly information on the page inclduing a video of the launch if there is one. 

[Link to site](http://spacex.ethancundick.com/)
## UX

### User stories 

1) Users need be able to search by SpaceX launches by year. 
2) Users need to be able to choose rocket where applicable. 
3) Users need to be able to select mission in year where applicable. 
4) Users need Inforamtion on mission when available. 
5) Users need mission video where available. 
6) Users need a way of being able to contact the site owner. 
7) Users must be able to use the site on both desktop and mobile devices. 

[Wireframe here](https://github.com/EthanCundick/SpaceX-Launch-History/blob/master/Design/Web%201920%20%E2%80%93%201.png)
 ## Features
- Filter by year - Users can select year to filter flights
- Filter by rocket if applicable - Users can select rocket type if there are different rockets flown that year. 
- Select which mission - Users can select missions within year selected. 
- Mission information and video - Userrs can see information on flight and watch a video where available.  

## Technologies Used

- Languages used: 
    - HTML 
    - CSS
    - JavaScript
- Frameworks Used: 
    - Boostrap:
        The Project used bootstrap to simplify responsivness and development speed. 
    - jQuery:
        The project uses JQuery to simplify DOM manipulation.

## Testing

### Launch Search Testing
- Used year dropdown to ensure it returned an array of years, selected multiple years and ensured they returned rockets and missions where applicable. 

- Ensured rocket drop down appeared only when there where multiple rockets used in a year and selected each rocket to see if missions updated per rocket. 

-  Ensured mission drop down always returned a list of missions. 

- Ensure that mission information was updated on change of mission selection. 

### Contact form  Testing
- Ensured when user entered email address that it is in a valid format by using regex. If invalid this will highlight the box border in red. Tried a mixture of address and only correctly formatted addresses worked.

- Ensured that the user has left a message in the box by checking its value is not empty, it will highlight red if empty. Tried to leave blank and highlighted red.

- Ensured that above criteria is met before submit/send button can be used. Clicked on submit when box above wasnt met and message does not send. 

### Responsiveness Testing

- Ensured site works on mobile and desktop by testing on desktop, tablet and pc devices. Have checked also in browser developer tools to see how it performed. 

## Deployment

This site was deployed into Azure blob storage, to do this I simply enabled static websites to be browsable on the blob storage and then upload the files into it, I then created a CNAME to point to the DNS name of the blob storage. 

