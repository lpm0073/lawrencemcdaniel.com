import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import SkillColumn from './skillColumn';
import SkillBar from './skillBar';
import './styles.css';


const Skills = (props) => {

    return(
        <React.Fragment>

            <div className="skills-page">
                <div className="site-page">
                    <RenderPageTitle theme="light" icon="fa-book" title="HARD" boxed_title="SKILLS" />

                    <div className="row mt-5 mb-5">
                        <SkillColumn pct="100" title="Web" icon="fa-code" description="Complete professional web sites and web apps using WordPress, Django, Angular, and Ionic" />
                        <SkillColumn pct="100" title="Mobile & IoT" icon="fa-mobile" description="Turnkey hybrid mobile apps with Ionic-Cordova. Complete IoT designs with Android-DragonBoard" />
                        <SkillColumn pct="100" title="Cloud" icon="fa-cloud" description="Efficient, highly-available and horizontally-scalable infrastructure designs for LAMP and .Net on AWS" />
                        <SkillColumn pct="100" title="Data" icon="fa-database" description="OLTP and BI designs & programming for MySQL and MS-SQL Server. High-availability designs for MongoDB, and MapReduce problems on Hadoop" />
                        <SkillColumn pct="100" title="DevOps" icon="fa-server" description="Create and maintain continuous integration strategies using GitHub, Capistrano, Jenkins, Chef, and Puppet" />
                        <SkillColumn pct="100" title="Machine Learning" icon="fa-magic" description="Applied Linear Algebra, AI and Neural Networks designs and coding using Octave and Python scikit-learn and NumPy" />
                    </div>

                    <div className="row mt-5 mb-5">
                        <div className="col-lg-6 col-md-12">
                            <SkillBar pct="100" description="Open edX" />
                            <SkillBar pct="100" description="Django, React, Angular, Ionic, WordPress" />
                            <SkillBar pct="100" description="MySQL, MongoDB, Hadoop, MS-SQL, Transact-SQL " />
                            <SkillBar pct="90" description="AWS, Boto3, Linux, Bash, Ansible, Jenkins, Chef, Puppet" />
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <SkillBar pct="100" description="English (Native) / Spanish (professional proficiency)" />
                            <SkillBar pct="100" description="Octave, MatLab, MS Excel, MS Excel VBA" />
                            <SkillBar pct="100" description="Javascript, Python, PHP, VBA, VB .Net, ANSI C, C++" />
                            <SkillBar pct="100" description="Ionic, Objective-C, Swift" />
                        </div>
                    </div>

                </div>
            </div>              

        </React.Fragment>
    );

}

export default Skills;


