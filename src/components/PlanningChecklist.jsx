import React from 'react'
import { Check } from 'lucide-react'

export default function PlanningChecklist({ items = [] }) {
	if (!items || items.length === 0) return null

	return (
		<div className="planning-checklist">
			<h4>Planned approach</h4>
			<ul>
				{items.map((item, idx) => (
					<li key={idx} style={{ animationDelay: `${idx * 80}ms` }}>
						<Check size={16} />
						<span>{item}</span>
					</li>
				))}
			</ul>
		</div>
	)
}
