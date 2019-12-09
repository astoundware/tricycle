﻿using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Tricycle.Media.FFmpeg.Models.Jobs;
using Tricycle.Media.FFmpeg.Serialization.Argument;

namespace Tricycle.Media.FFmpeg.Tests.Serialization.Argument
{
    [TestClass]
    public class FilterListConverterTests
    {
        FilterListConverter _converter;

        [TestInitialize]
        public void Setup()
        {
            _converter = new FilterListConverter();
        }

        [TestMethod]
        [ExpectedException(typeof(NotSupportedException))]
        public void ConvertThrowsExceptionWhenValueIsNotFilterList()
        {
            _converter.Convert("-filter_complex", 0);
        }

        [TestMethod]
        public void ConvertIncludesName()
        {
            var filter = new Filter("tonemap");

            Assert.AreEqual("-filter tonemap", _converter.Convert("-filter", new IFilter[] { filter }));
        }

        [TestMethod]
        public void ConvertIncludesInputs()
        {
            var filter = new Filter("scale2ref")
            {
                Inputs = new IInput[]
                {
                    new StreamInput(0, 3),
                    new StreamInput(0, 0)
                }
            };

            Assert.AreEqual("-filter_complex [0:3][0:0]scale2ref",
                            _converter.Convert("-filter_complex", new IFilter[] { filter }));
        }

        [TestMethod]
        public void ConvertIncludesOuputLabels()
        {
            var filter = new Filter("scale2ref")
            {
                OutputLabels = new string[]
                {
                    "sub",
                    "ref"
                }
            };

            Assert.AreEqual("-filter_complex scale2ref[sub][ref]",
                            _converter.Convert("-filter_complex", new IFilter[] { filter }));
        }

        [TestMethod]
        public void ConvertIncludesOptionName()
        {
            var filter = new Filter("tonemap")
            {
                Options = new FilterOption[]
                {
                    FilterOption.FromName("hable")
                }
            };

            Assert.AreEqual("-filter tonemap=hable",
                            _converter.Convert("-filter", new IFilter[] { filter }));
        }

        [TestMethod]
        public void ConvertIncludesOptionValue()
        {
            var filter = new Filter("setsar")
            {
                Options = new FilterOption[]
                {
                    FilterOption.FromValue("1")
                }
            };

            Assert.AreEqual("-filter setsar=1",
                            _converter.Convert("-filter", new IFilter[] { filter }));
        }

        [TestMethod]
        public void ConvertIncludesOptionNameAndValue()
        {
            var filter = new Filter("tonemap")
            {
                Options = new FilterOption[]
                {
                    new FilterOption("desat", "0")
                }
            };

            Assert.AreEqual("-filter tonemap=desat=0",
                            _converter.Convert("-filter", new IFilter[] { filter }));
        }

        [TestMethod]
        public void ConvertDelimitsOptions()
        {
            var filter = new Filter("zscale")
            {
                Options = new FilterOption[]
                {
                    new FilterOption("t", "bt709"),
                    new FilterOption("m", "bt709"),
                    new FilterOption("r", "tv")
                }
            };

            Assert.AreEqual("-filter zscale=t=bt709:m=bt709:r=tv",
                            _converter.Convert("-filter", new IFilter[] { filter }));
        }

        [TestMethod]
        public void ConvertDelimitsFilters()
        {
            var filters = new IFilter[]
            {
                new Filter("scale")
                {
                    Options = new FilterOption[]
                    {
                        FilterOption.FromValue("1920"),
                        FilterOption.FromValue("1080")
                    }
                },
                new Filter("setsar")
                {
                    Options = new FilterOption[]
                    {
                        FilterOption.FromValue("1"),
                        FilterOption.FromValue("1")
                    }
                },
            };

            Assert.AreEqual("-filter scale=1920:1080,setsar=1:1",
                            _converter.Convert("-filter", filters));
        }

        [TestMethod]
        public void ConvertChainsFilters()
        {
            var filters = new IFilter[]
            {
                new Filter("scale2ref")
                {
                    OutputLabels = new string[]
                    {
                        "sub",
                        "ref"
                    }
                },
                new Filter("overlay")
                {
                    Inputs = new IInput[]
                    {
                        new LabeledInput("ref"),
                        new LabeledInput("sub")
                    },
                    ChainToPrevious = true
                }
            };

            Assert.AreEqual("-filter_complex scale2ref[sub][ref];[ref][sub]overlay",
                            _converter.Convert("-filter_complex", filters));
        }

        [TestMethod]
        public void ConvertHandlesCustomFilters()
        {
            string argName = "-filter";
            var filter = new CustomFilter("hqdn3d=4:4:3:3");

            Assert.AreEqual($"{argName} {filter.Data}", _converter.Convert(argName, new IFilter[] { filter }));
        }
    }
}
