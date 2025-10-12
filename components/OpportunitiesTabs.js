'use client';
import { useState } from 'react';
import Internships from './Internships';
import ResearchOpportunities from './ResearchOpportunities';
import StudyAbroad from './StudyAbroad';
import Scholarships from './Scholarships';

export default function OpportunitiesTabs() {
  const tabs = ['Research', 'Internships', 'Study Abroad', 'Scholarships'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div>
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'Research' && <ResearchOpportunities />}
        {activeTab === 'Internships' && <Internships />}
        {activeTab === 'Study Abroad' && <StudyAbroad />}
        {activeTab === 'Scholarships' && <Scholarships />}
      </div>
    </div>
  );
}
