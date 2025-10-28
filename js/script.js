// Menunggu sampai halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
    // Menampilkan tahun saat ini di footer
    document.getElementById("current-year").textContent = new Date().getFullYear();

    // Ambil data dari file JSON
    fetch("data.json")
        .then(response => {
            if (!response.ok) throw new Error("Gagal memuat data JSON");
            return response.json();
        })
        .then(data => {
            loadProfile(data.profile);
            loadEducation(data.education);
            loadExperience(data.experience);
            loadProjects(data.projects);
        })
        .catch(error => console.error("Error:", error));
});

// ==== PROFILE ====
function loadProfile(profile) {
    document.getElementById("profile-name").textContent = profile.name;
    document.getElementById("profile-description").textContent = profile.description;
    document.getElementById("profile-email").textContent = profile.email;
    document.getElementById("profile-phone").textContent = profile.phone;
    document.getElementById("profile-pic").src = profile.image;
    document.getElementById("cv-download").href = profile.cv;

    // Tambahkan link sosial media
    const socialLinks = document.getElementById("social-links");
    socialLinks.innerHTML = "";
    profile.social.forEach(s => {
        const a = document.createElement("a");
        a.href = s.link;
        a.target = "_blank";
        a.title = s.platform;
        a.innerHTML = `<i class="${s.icon}"></i>`;
        socialLinks.appendChild(a);
    });

    // Tambahkan skills
    const skillsGrid = document.getElementById("skills-grid");
    skillsGrid.innerHTML = "";
    profile.skills.forEach(skill => {
        const div = document.createElement("div");
        div.classList.add("skill-item");
        div.textContent = skill;
        skillsGrid.appendChild(div);
    });
}

// ==== EDUCATION ====
function loadEducation(education) {
    const list = document.getElementById("education-list");
    list.innerHTML = "";
    education.forEach(edu => {
        const div = document.createElement("div");
        div.classList.add("education-item");
        div.innerHTML = `
            <h3>${edu.degree}</h3>
            <p><strong>${edu.institution}</strong> | ${edu.year}</p>
            <p>${edu.description}</p>
        `;
        list.appendChild(div);
    });
}

// ==== EXPERIENCE ====
function loadExperience(experience) {
    const list = document.getElementById("experience-list");
    list.innerHTML = "";
    experience.forEach(exp => {
        const div = document.createElement("div");
        div.classList.add("experience-item");
        div.innerHTML = `
            <h3>${exp.role}</h3>
            <p><strong>${exp.company}</strong> | ${exp.year}</p>
            <p>${exp.description}</p>
        `;
        list.appendChild(div);
    });
}

// ==== PROJECTS ====
function loadProjects(projects) {
    const grid = document.getElementById("projects-grid");
    grid.innerHTML = "";
    projects.forEach(project => {
        const card = document.createElement("div");
        card.classList.add("project-card");
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p><i class="fas fa-calendar"></i> ${project.year}</p>
            <p><i class="fas fa-user"></i> ${project.role}</p>
            ${project.organization ? `<p><i class="fas fa-building"></i> ${project.organization}</p>` : ""}
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank" class="project-link">
                View Project <i class="fa-solid fa-up-right-from-square"></i>
            </a>
        `;
        grid.appendChild(card);
    });
}
