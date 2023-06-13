// Retrieve the necessary DOM elements
const scalingForm = document.getElementById('scalingForm');
const resultDiv = document.getElementById('result');
const inputs = document.querySelectorAll('input[type="number"]');

// Add event listener to the form submission
scalingForm.addEventListener('submit', scaleWindTunnel);

// Function to handle wind tunnel scaling
function scaleWindTunnel(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve input values
  const lengthScale = parseFloat(document.getElementById('lengthScale').value);
  const windSpeedScale = parseFloat(document.getElementById('windSpeedScale').value);
  const timeScale = parseFloat(document.getElementById('timeScale').value);

  // Perform the scaling calculations
  const lengthScaleInverse = 1 / lengthScale;
  const widthScaleInverse = 1 / lengthScale;
  const heightScaleInverse = 1 / lengthScale;
  const weightLengthScaleInverse = 1 / (lengthScale * lengthScale);
  const momentLengthScaleInverse = 1 / (lengthScale * lengthScale * lengthScale * lengthScale);
  const dampingRatio = 1;
  const timeScaleInverse = timeScale / lengthScale;
  const windSpeedScaleInverse = 1 / windSpeedScale;
  const frequencyScale = lengthScale / windSpeedScale;

  // Prepare the table HTML
  const tableHTML = `
    <table>
      <tr>
        <th>Parameter</th>
        <th>Scaled Value</th>
      </tr>
      <tr>
        <td>Length Scale Inverse (Lp)</td>
        <td>${lengthScaleInverse}</td>
      </tr>
      <tr>
        <td>Width Scale Inverse (Bp)</td>
        <td>${widthScaleInverse}</td>
      </tr>
      <tr>
        <td>Height Scale Inverse (Hp)</td>
        <td>${heightScaleInverse}</td>
      </tr>
      <tr>
        <td>Weight/Length Scale Inverse (Mp)</td>
        <td>${weightLengthScaleInverse}</td>
      </tr>
      <tr>
        <td>Moment/Length Scale Inverse (Ip)</td>
        <td>${momentLengthScaleInverse}</td>
      </tr>
      <tr>
        <td>Damping Ratio (ξ)</td>
        <td>${dampingRatio}</td>
      </tr>
      <tr>
        <td>Time Scale Inverse (tp)</td>
        <td>${timeScaleInverse}</td>
      </tr>
      <tr>
        <td>Wind Speed Scale Inverse (Vp)</td>
        <td>${windSpeedScaleInverse}</td>
      </tr>
      <tr>
        <td>Frequency Scale (fp)</td>
        <td>${frequencyScale}</td>
      </tr>
    </table>
  `;

  // Display the table
  resultDiv.innerHTML = tableHTML;
}

// Disable the last input after two inputs are selected
inputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    if (index >= 2) {
      inputs.forEach((input, i) => {
        if (i !== index) {
          input.disabled = true;
          input.classList.add('disabled');
        }
      });
    }
  });
});
