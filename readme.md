# L'évènement "click" ne fonctionne pas pour les iPhones !!!



## 11/10/2017 - onclick event doesn't work on iphone

https://stackoverflow.com/questions/46681661/onclick-event-doesnt-work-on-iphone
=> https://stackoverflow.com/questions/32708496/safari-on-ios-9-does-not-trigger-click-event-on-hidden-input-file

At the stylesheet, the element which calls the action must have the property `cursor: pointer;`. Probably Apple put this requirement in these calls for best feedback on user interface.


## 23/05/2017 - Click event doesnt work in safari mobile for some HTML content

https://stackoverflow.com/questions/39243513/click-event-doesnt-work-in-safari-mobile-for-some-html-content

Anyway I finally found a solution. The reason was, iPhone Safari doesnt support event delegation. What my initial requirement was to trigger the click event when the body of the HTML is clicked. Anyway the issue was only occurring on Safari mobile and the reason I found was, Safari doesn't support event delegation for the click event. I solved it by adding below code in the body CSS.

```
cursor: pointer;
```

Thre resources I got the answer were:

* Click event delegation on the iPhone: https://www.quirksmode.org/blog/archives/2010/09/click_event_del.html

* jQuery click events not working in iOS : https://stackoverflow.com/questions/14795944/jquery-click-events-not-working-in-ios/16006333


## 02/04/2014 - jQuery click events not working in iOS [duplicate]

https://stackoverflow.com/questions/14795944/jquery-click-events-not-working-in-ios/16006333

There is an issue with iOS not registering click/touch events bound to elements added after DOM loads.

While PPK has this advice: https://www.quirksmode.org/blog/archives/2010/09/click_event_del.html

I've found this the easy fix, simply add this to the css:

```
cursor: pointer;
```


## 20/09/2013 - Make onclick work on iphone

https://stackoverflow.com/questions/18914568/make-onclick-work-on-iphone

This post got more attention, so I'm going to add another commonly used, more up to date, trick:

```
// First we check if you support touch, otherwise it's click:
let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

// Then we bind via thát event. This way we only bind one event, instead of the two as below
document.getElementById('hbs').addEventListener(touchEvent, someFunction);

// or if you use jQuery:
$('#hbs').on(touchEvent, someFunction);
```

The let touchEvent should be declared out of function (also not in a document.ready) at the top of your javascript. This way you can use this in all your javascript. This also allows easy jQuery usage.


## 28/09/2010 - Click event delegation on the iPhone

https://www.quirksmode.org/blog/archives/2010/09/click_event_del.html

From the dawn of history browsers have supported event delegation. If you click on an element, the event will bubble all the way up to the document in search of event handlers to execute.

It turns out that Safari on the iPhone does not support event delegation for click events, unless the click takes place on a link or input. That’s an annoying bug, but fortunately there’s a workaround available.

...

Setting the cursor of the div to pointer in CSS also does the trick without any extra JS.

I've recreated the first test case with this addition here:

http://jimmybyrum.com/tests/eventdelegation.html

and everything works fine.
