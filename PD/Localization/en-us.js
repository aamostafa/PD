app.config(function ($translateProvider) {
    $translateProvider.translations('en-us', {
		TITLE: 'this is a title translated',
		Foo: 'ay kalam',

		//menus
		Dashboard: 'My Dashboard',
		Catalog: 'Course Catalog',
		Create_Course: 'Create Course',
		Welcome: 'Welcome',
		'completed_courses': 'Completed',
		//Create Course
		//"Course Basic Info": "Course Basic Info",
		//"Course Details": "Course Details",
		//"Course Schedule": "Course Schedule",
		//"Instructors": "Instructors",
		//"Course Outlines": "Course Outlines",
		//"Course Competencies": "Course Competencies",
		//"Course FAQs": "Course FAQs",
		//"Course Name": "Course Name",
		//"Short Name": "Short Name",
		//"Course Section": "",
		//"Course Category": "",
		//"Course Image": "",
	    //"Course Brief": "",
		//"About The Course": "",
		//"Target Audience": "",
		//"Required Background": "",
		//"Instructor Name": "",
		//"Outline & Content": "",
		//"Add New Session": "",
		//"Session Name": "",
		//"Publishing Date": "",
		//"Objectives": "",
		//"Material Title": "",
		//"Material URL": "",
		//"Published": "",
		//"Session Content": "",
		//"Question": "",
		//"Answer": "",
		//"Save FAQ": "",
		//"Publish": "",
		//"Next": "",
	    //"Back": ""

	    //Dashboard:
		'No_Courses_TrainingPlan': "You don't have courses in your training plan yet",
		'View_Courses': 'View Courses',
        
	});
	//$translateProvider.useLocalStorage();

	//$translateProvider.preferredLanguage('en');
	$translateProvider.determinePreferredLanguage(function () {
	    var lang = localStorage["lang"] || 'en-us';
		return lang;
		// define a function to determine the language
		// and return a language key
	});
});