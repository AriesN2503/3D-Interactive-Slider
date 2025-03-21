# 3D Interactive Slider

A modern, responsive testimonial carousel featuring smooth 3D transitions and interactive scroll/click navigation. Built with vanilla JavaScript and CSS transforms.

![3D Interactive Slider Demo](./assets/demo-preview.gif)

## Features

- Smooth 3D circular transitions between testimonials
- Interactive navigation via scroll or click
- Responsive design for both desktop and mobile
- Custom quote icons and avatar images
- Gradient background effects
- Dynamic positioning and scaling animations
- Touch-friendly mobile interface

## Technologies Used

- HTML5
- CSS3 (Transforms, Transitions)
- Vanilla JavaScript
- No external dependencies

## Usage

1. Include the required files:
```html
<link rel="stylesheet" href="./styles.css" />
<script src="./script.js"></script>
```

2. Use the following HTML structure:
```html
<div class="elementor">
  <div class="testimonial-carousel">
    <div class="container">
      <div class="scroll-container">
        <div class="testimonial-circle-container" id="circleContainer">
          <section class="section">
            <!-- Testimonial content here -->
          </section>
        </div>
      </div>
    </div>
  </div>
</div>
```

3. Add testimonials using the section template:
```html
<section class="section">
  <div class="content">
    <div class="quote-icon"><!-- SVG quote icon --></div>
    <img src="avatar-url.jpg" alt="Name" class="avatar" />
    <div class="user-info">
      <div class="user-header">
        <h3>Name</h3>
        <span class="job-title">Position</span>
      </div>
      <p class="testimonial">"Testimonial text"</p>
    </div>
  </div>
</section>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Customization

### Colors
Modify the gradient colors in `styles.css`:
```css
.section.active {
  background-image: linear-gradient(135deg, #ff0000 0%, #000000 40%, #000000 60%, #0000ff 100%);
}
```

### Dimensions
Adjust section sizes in `styles.css`:
```css
.section {
  width: 600px;
  height: 150px;
}
```

### Animation
Modify timing in `script.js`:
```javascript
const ANIMATION_DURATION = 600;
const SCROLL_DELAY = 600;
```

## License

MIT License

## Author

Created by AriesN2503

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
