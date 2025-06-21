document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 60, // Adjust for navbar height
          behavior: 'smooth'
        });
      }
      // Close mobile menu after click
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    });
  });

  // Active link highlighting on scroll
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navItems = document.querySelectorAll('.nav-links a');

  function onScroll() {
    const scrollPos = window.scrollY + 70; // Offset for navbar height
    let currentSectionId = '';
    for (const section of sections) {
      if (section.offsetTop <= scrollPos) {
        currentSectionId = section.id;
      }
    }
    navItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSectionId) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll);
  onScroll(); // Initialize on page load

  // ===== Rank Prediction Logic with IIT Comparison and Chart.js =====

  const form = document.getElementById('predictForm');
  const rankInput = document.getElementById('rankInput');
  const categoryInput = document.getElementById('categoryInput');
  const output = document.getElementById('predictionOutput');
  const chartCanvas = document.getElementById('rankChart');
  let chartInstance;

  // Cutoff data for multiple IITs including new IITs: Kharagpur, Roorkee, Guwahati
  const cutoffData = {
    madras: {
      general: [
        { branch: "CSE", maxRank: 200 },
        { branch: "EE", maxRank: 600 },
        { branch: "ME", maxRank: 1200 },
        { branch: "Aero", maxRank: 2000 },
        { branch: "Civil", maxRank: 4000 }
      ],
      obc: [
        { branch: "CSE", maxRank: 500 },
        { branch: "EE", maxRank: 1200 },
        { branch: "ME", maxRank: 2000 },
        { branch: "Aero", maxRank: 3000 },
        { branch: "Civil", maxRank: 5000 }
      ],
      sc: [
        { branch: "CSE", maxRank: 1000 },
        { branch: "EE", maxRank: 2000 },
        { branch: "ME", maxRank: 3000 },
        { branch: "Aero", maxRank: 4000 },
        { branch: "Civil", maxRank: 6000 }
      ],
      st: [
        { branch: "CSE", maxRank: 1500 },
        { branch: "EE", maxRank: 2500 },
        { branch: "ME", maxRank: 3500 },
        { branch: "Aero", maxRank: 4500 },
        { branch: "Civil", maxRank: 7000 }
      ]
    },
    bombay: {
      general: [
        { branch: "CSE", maxRank: 70 },
        { branch: "EE", maxRank: 300 },
        { branch: "ME", maxRank: 1000 },
        { branch: "Aero", maxRank: 1800 },
        { branch: "Civil", maxRank: 3500 }
      ],
      obc: [
        { branch: "CSE", maxRank: 200 },
        { branch: "EE", maxRank: 700 },
        { branch: "ME", maxRank: 1500 },
        { branch: "Aero", maxRank: 2500 },
        { branch: "Civil", maxRank: 4500 }
      ],
      sc: [
        { branch: "CSE", maxRank: 400 },
        { branch: "EE", maxRank: 1200 },
        { branch: "ME", maxRank: 2500 },
        { branch: "Aero", maxRank: 3500 },
        { branch: "Civil", maxRank: 5500 }
      ],
      st: [
        { branch: "CSE", maxRank: 600 },
        { branch: "EE", maxRank: 1500 },
        { branch: "ME", maxRank: 3000 },
        { branch: "Aero", maxRank: 4000 },
        { branch: "Civil", maxRank: 6000 }
      ]
    },
    delhi: {
      general: [
        { branch: "CSE", maxRank: 110 },
        { branch: "EE", maxRank: 400 },
        { branch: "ME", maxRank: 1100 },
        { branch: "Aero", maxRank: 1900 },
        { branch: "Civil", maxRank: 3800 }
      ],
      obc: [
        { branch: "CSE", maxRank: 300 },
        { branch: "EE", maxRank: 900 },
        { branch: "ME", maxRank: 1800 },
        { branch: "Aero", maxRank: 2800 },
        { branch: "Civil", maxRank: 4800 }
      ],
      sc: [
        { branch: "CSE", maxRank: 600 },
        { branch: "EE", maxRank: 1500 },
        { branch: "ME", maxRank: 2800 },
        { branch: "Aero", maxRank: 3800 },
        { branch: "Civil", maxRank: 5800 }
      ],
      st: [
        { branch: "CSE", maxRank: 800 },
        { branch: "EE", maxRank: 1800 },
        { branch: "ME", maxRank: 3200 },
        { branch: "Aero", maxRank: 4200 },
        { branch: "Civil", maxRank: 6200 }
      ]
    },
    kanpur: {
      general: [
        { branch: "CSE", maxRank: 220 },
        { branch: "EE", maxRank: 650 },
        { branch: "ME", maxRank: 1400 },
        { branch: "Aero", maxRank: 2100 },
        { branch: "Civil", maxRank: 4200 }
      ],
      obc: [
        { branch: "CSE", maxRank: 500 },
        { branch: "EE", maxRank: 1300 },
        { branch: "ME", maxRank: 2500 },
        { branch: "Aero", maxRank: 3500 },
        { branch: "Civil", maxRank: 5500 }
      ],
      sc: [
        { branch: "CSE", maxRank: 800 },
        { branch: "EE", maxRank: 1800 },
        { branch: "ME", maxRank: 3200 },
        { branch: "Aero", maxRank: 4200 },
        { branch: "Civil", maxRank: 6200 }
      ],
      st: [
        { branch: "CSE", maxRank: 1000 },
        { branch: "EE", maxRank: 2000 },
        { branch: "ME", maxRank: 3500 },
        { branch: "Aero", maxRank: 4500 },
        { branch: "Civil", maxRank: 7000 }
      ]
    },
    kharagpur: {
      general: [
        { branch: "CSE", maxRank: 270 },
        { branch: "EE", maxRank: 650 },
        { branch: "ME", maxRank: 1300 },
        { branch: "Aero", maxRank: 2300 },
        { branch: "Civil", maxRank: 4500 }
      ],
      obc: [
        { branch: "CSE", maxRank: 600 },
        { branch: "EE", maxRank: 1400 },
        { branch: "ME", maxRank: 2300 },
        { branch: "Aero", maxRank: 3300 },
        { branch: "Civil", maxRank: 5500 }
      ],
      sc: [
        { branch: "CSE", maxRank: 900 },
        { branch: "EE", maxRank: 1900 },
        { branch: "ME", maxRank: 2800 },
        { branch: "Aero", maxRank: 3800 },
        { branch: "Civil", maxRank: 6200 }
      ],
      st: [
        { branch: "CSE", maxRank: 1100 },
        { branch: "EE", maxRank: 2100 },
        { branch: "ME", maxRank: 3200 },
        { branch: "Aero", maxRank: 4300 },
        { branch: "Civil", maxRank: 7000 }
      ]
    },
    roorkee: {
      general: [
        { branch: "CSE", maxRank: 350 },
        { branch: "EE", maxRank: 900 },
        { branch: "ME", maxRank: 1500 },
        { branch: "Aero", maxRank: 2500 },
        { branch: "Civil", maxRank: 4700 }
      ],
      obc: [
        { branch: "CSE", maxRank: 700 },
        { branch: "EE", maxRank: 1600 },
        { branch: "ME", maxRank: 2800 },
        { branch: "Aero", maxRank: 3800 },
        { branch: "Civil", maxRank: 6000 }
      ],
      sc: [
        { branch: "CSE", maxRank: 1000 },
        { branch: "EE", maxRank: 2100 },
        { branch: "ME", maxRank: 3500 },
        { branch: "Aero", maxRank: 4500 },
        { branch: "Civil", maxRank: 7000 }
      ],
      st: [
        { branch: "CSE", maxRank: 1200 },
        { branch: "EE", maxRank: 2300 },
        { branch: "ME", maxRank: 4000 },
        { branch: "Aero", maxRank: 4800 },
        { branch: "Civil", maxRank: 7500 }
      ]
    },
    guwahati: {
      general: [
        { branch: "CSE", maxRank: 400 },
        { branch: "EE", maxRank: 1000 },
        { branch: "ME", maxRank: 1700 },
        { branch: "Aero", maxRank: 2600 },
        { branch: "Civil", maxRank: 4800 }
      ],
      obc: [
        { branch: "CSE", maxRank: 800 },
        { branch: "EE", maxRank: 1800 },
        { branch: "ME", maxRank: 3200 },
        { branch: "Aero", maxRank: 4200 },
        { branch: "Civil", maxRank: 6500 }
      ],
      sc: [
        { branch: "CSE", maxRank: 1100 },
        { branch: "EE", maxRank: 2300 },
        { branch: "ME", maxRank: 3800 },
        { branch: "Aero", maxRank: 4800 },
        { branch: "Civil", maxRank: 7000 }
      ],
      st: [
        { branch: "CSE", maxRank: 1300 },
        { branch: "EE", maxRank: 2500 },
        { branch: "ME", maxRank: 4000 },
        { branch: "Aero", maxRank: 5000 },
        { branch: "Civil", maxRank: 7500 }
      ]
    }
  };

  function predictByIIT(iit, rank, category) {
    const data = cutoffData[iit]?.[category];
    if (!data) return [];
    return data.filter(branch => rank <= branch.maxRank);
  }

  function buildChart() {
    const labels = ["CSE", "EE", "ME", "Aero", "Civil"];
    const categories = Object.keys(cutoffData);
    const datasets = categories.map((iit, idx) => {
      return {
        label: iit.toUpperCase(),
        data: cutoffData[iit].general.map(d => d.maxRank),
        backgroundColor: `hsl(${idx * 50}, 70%, 60%)`
      };
    });

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(chartCanvas, {
      type: 'bar',
      data: {
        labels,
        datasets
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Branch-wise General Category Closing Ranks'
          }
        }
      }
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const rank = parseInt(rankInput.value);
    const category = categoryInput.value.toLowerCase();
    if (!rank || !category) {
      output.innerHTML = "Please enter a valid rank and category.";
      return;
    }

    const predictionGrid = document.getElementById('predictionGrid');
    if (!predictionGrid) return;

    predictionGrid.innerHTML = ''; // Clear previous results

    Object.keys(cutoffData).forEach(iit => {
      const matched = predictByIIT(iit, rank, category);
      if (matched.length) {
        let iitSection = `<div>
          <h3 class="text-xl font-semibold text-${getIITColor(iit)} mb-2">${iit.toUpperCase()}</h3>
          <ul class="space-y-1 text-green-700">`;
        matched.forEach(b => {
          iitSection += `<li>✅ ${b.branch}</li>`;
        });
        iitSection += '</ul></div>';
        predictionGrid.innerHTML += iitSection;
      }
    });

    if (predictionGrid.innerHTML.trim() === '') {
      predictionGrid.innerHTML = `<p style="color:red;">No matches found in top IITs for your rank.</p>`;
    }

    buildChart();
  });

  function getIITColor(iit) {
    switch (iit) {
      case 'madras': return 'red-700';
      case 'bombay': return 'yellow-600';
      case 'delhi': return 'blue-700';
      case 'kanpur': return 'purple-700';
      case 'kharagpur': return 'pink-700';
      case 'roorkee': return 'teal-700';
      case 'guwahati': return 'orange-700';
      default: return 'gray-700';
    }
  }

  // ===== PDF EXPORT =====
  document.getElementById('exportPDF').addEventListener('click', () => {
    const element = document.getElementById('predictionResult');

    const opt = {
      margin: 0.5,
      filename: 'iit_rank_prediction.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  });
});
