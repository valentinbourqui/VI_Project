function Council() {
	var council;
	var selectedcouncil;

	/*	this.getCouncillersOnline = function() {
	 for (var i = 1; i < 120; i++) {
	 $.ajax({
	 url : 'http://ws.parlament.ch/councillors/historic?format=json&pagenumber='+i,
	 async : false,
	 dataType : 'json',
	 success : function(data) {
	 if(i==1)
	 council = data;
	 else
	 council=council.concat(data);
	 }
	 });
	 }
	 selectedcouncil = council;
	 $('body').append(JSON.stringify(council,null,2));
	 console.log(JSON.stringify(council,null,2));
	 return this;
	 }*/

	this.getCouncillers = function() {
		if (council == null) {
			$.ajax({
				url : '../data/Councillers.json',
				async : false,
				dataType : 'json',
				success : function(data) {
					council = data;
				}
			});
		}
		selectedcouncil = council;
		return this;
	};

	this.cantonfilter = function(canton) {
		selectedcouncil = council.filter(function(council) {
			return council.canton.abbreviation == canton;
		});
		return this;
	}

	this.genderfilter = function(gender) {
		selectedcouncil = council.filter(function(council) {
			return council.gender == gender;
		});
		return this;
	}

	this.councilfilter = function(council) {
		selectedcouncil = council.filter(function(counciller) {
			return counciller.council.abbreviation.substring(0,2) == council;
		});
		return this;
	}

	this.datefilter = function() {
		selectedcouncil = council.filter(function(council) {
			var d = council.membership.leavingDate == null;
			return d;
		});
		return this;
	}

	this.byCanton = function() {
		var countCanton = {};
		$.each(selectedcouncil, function(index, value) {
			if (value.canton.abbreviation in countCanton)
				countCanton[value.canton.abbreviation]++;
			else
				countCanton[value.canton.abbreviation] = 1;
		});
		return countCanton;
	}

	this.WomanProportion = function() {
		var countWomen = {};
		var countMen = {};
		$.each(selectedcouncil, function(index, value) {
			var countTab = value.gender == 'f' ? countWomen : countMen;
			if (value.canton.abbreviation in countTab)
				countTab[value.canton.abbreviation]++;
			else
				countTab[value.canton.abbreviation] = 1;
		});
		$.each(countWomen, function(index, value) {
			countWomen[index] = countWomen[index] / countMen[index];
		});
		return countWomen;
	}

	this.toObject = function() {
		return selectedcouncil;
	}
}
